import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Contact } from "../DTO/ContactDTO";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({
    name: "",
    lastname: "",
    phone: "",
    adress: "",
    email: "",
  });
  const [editContact, setEditContact] = useState({
    id: 0,
    name: "",
    lastname: "",
    phone: "",
    adress: "",
    email: "",
  });

  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favoriteContacts, setFavoriteContacts] = useState<number[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState<number | null>(null);

  
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch("http://localhost:3333/contact")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        return response.json();
      })
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error fetching contacts:", error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleAddContact = () => {
    if (
      !newContact.name ||
      !newContact.lastname ||
      !newContact.phone ||
      !newContact.adress ||
      !newContact.email
    ) {
      alert("Por favor, preencha todos os campos antes de adicionar um contato.");
      return;
    }
  
    fetch("http://localhost:3333/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add contact");
        }
        return response.json();
      })
      .then((data) => {
        setContacts([...contacts, data]);
        setNewContact({
          name: "",
          lastname: "",
          phone: "",
          adress: "",
          email: "",
        });
      })
      .catch((error) => console.error("Error adding contact:", error));
  };

  const handleDeleteContact = (id: number) => {
    setDeleteContactId(id);
    setShowDeleteConfirmModal(true);
  };

  const toggleFavoriteContact = (id: number) => {
    setFavoriteContacts((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favoriteId) => favoriteId !== id)
        : [...prevFavorites, id]
    );
  };
  
  const confirmDeleteContact = () => {
    if (deleteContactId !== null) {
      fetch(`http://localhost:3333/contact/${deleteContactId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete contact");
          }
          setContacts(contacts.filter((contact) => contact.id !== deleteContactId));
          setFavoriteContacts(
            favoriteContacts.filter((contactId) => contactId !== deleteContactId)
          );
          setShowDeleteConfirmModal(false);
          setDeleteContactId(null);
        })
        .catch((error) => console.error("Error deleting contact:", error));
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditContact(contact);
    setVisible(true);
  };

  const handleUpdateContact = () => {
    fetch(`http://localhost:3333/contact/${editContact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editContact),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update contact");
        }
        return response.json();
      })
      .then((data) => {
        setContacts(
          contacts.map((contact) =>
            contact.id === data.id ? data : contact
          )
        );
        setVisible(false);

      })
      .catch((error) => console.error("Error updating contact:", error));
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div style={{ display: "flex", marginBottom: 30 }}>
        <div
          style={{
            marginRight: 20,
            background: "#282e57",
            marginTop: 5,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              marginTop: 40,
            }}
          >
            <h3
              style={{
                color: "#fff",
                fontFamily: "monospace",
                fontSize: 20,
                fontWeight: 900,
                textDecoration: "underline",
              }}
            >
              Lista de contato
            </h3>
            <input
              type="text"
              placeholder="Pesquisar por nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: 10,
                border: "1px solid #5a748c",
                marginRight: 10,
                padding: 5,
                height: 20,
                background: "#fff",
                color: "#5a748c",
                width: 200,
                marginLeft: 15,
              }}
            />

            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  height: 45,
                  width: "90%",
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderRadius: 10,
                  borderColor: "#fff",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "60%",
                  }}
                >
                  <Link to={`/detail/${contact.id}`} className="contact-link">
                    <h1
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        fontFamily: "monospace",
                        fontSize: 20,
                      }}
                    >
                      {contact.name}
                    </h1>
                  </Link>
                </div>

                <div style={{ width: "12%" }}>
                  <button
                    onClick={() => toggleFavoriteContact(contact.id)}
                    style={{
                      backgroundColor: "transparent",
                      borderStyle: "none",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      color="#fff"
                      viewBox="0 0 24 24"
                      fill={favoriteContacts.includes(contact.id) ? "gold" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star"
                    >
                      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.78L12 2 10.18 8.46 1 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                </div>
                <div style={{ width: "13%" }}>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    style={{
                      backgroundColor: "transparent",
                      borderStyle: "none",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      color="#fff"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-trash"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>

                <div style={{ width: "13%" }}>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      borderStyle: "none",
                    }}
                    onClick={() => handleEditContact(contact)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="#fff"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-user-round-pen"
                    >
                      <path d="M2 21a8 8 0 0 1 10.821-7.487" />
                      <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                      <circle cx="10" cy="8" r="5" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            background: "#2E335C",
            width: 500,
            display:'flex',
            flexDirection:'column',
            height: 500,
            borderRadius: 20,
          }}
        >
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontFamily: "monospace",
              marginTop: 50,
              fontSize: 25,
              textDecoration: "underline",
            }}
          >
            Adicionar Novo Contato
          </h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              marginTop: 50,
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={newContact.name}
              onChange={handleInputChange}
              style={{
                borderRadius: 5,
                border: "none",
                padding: 10,
              }}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Sobrenome"
              value={newContact.lastname}
              onChange={handleInputChange}
              style={{
                borderRadius: 5,
                border: "none",
                padding: 10,
              }}
            />
            <input
              type="text"
              name="phone"
              placeholder="Telefone"
              value={newContact.phone}
              onChange={handleInputChange}
              style={{
                border: "none",
                padding: 10,
                borderRadius: 5,
              }}
            />
            <input
              type="text"
              name="adress"
              placeholder="Endereço"
              value={newContact.adress}
              onChange={handleInputChange}
              style={{
                borderRadius: 5,
                border: "none",
                padding: 10,
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newContact.email}
              onChange={handleInputChange}
              style={{
                border: "none",
                padding: 10,
                borderRadius: 5,
              }}
            />
            <button
              type="button"
              onClick={handleAddContact}
              style={{
                borderRadius: 10,
                border: "none",
                height: 35,
                textAlign: "center",
                width: "37%",
                fontWeight: "900",
                marginTop: 10,
                backgroundColor: "green",
                color: "#fff",
              }}
            >
              Adicionar Contato
            </button>
          </form>

          {/* Modal */}
          {visible && (
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 9999,
              }}
            >
              <div
                style={{
                  backgroundColor: "#252536",
                  width: 500,
                  height: 500,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    height: 55,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#252536",
                  }}
                >
                  <h2 style={{ margin: 0, color: "white" }}>EDITAR CONTATO</h2>
                  <button
                    onClick={() => setVisible(false)}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      color="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-x"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  </button>
                </div>
                <div style={{ padding: 20 }}>
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 50,
                    }}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Nome"
                      value={editContact.name}
                      onChange={handleEditInputChange}
                      style={{
                        borderRadius: 5,
                        border: "none",
                        padding: 10,
                      }}
                    />
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Sobrenome"
                      value={editContact.lastname}
                      onChange={handleEditInputChange}
                      style={{
                        borderRadius: 5,
                        border: "none",
                        padding: 10,
                      }}
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Telefone"
                      value={editContact.phone}
                      onChange={handleEditInputChange}
                      style={{
                        border: "none",
                        padding: 10,
                        borderRadius: 5,
                      }}
                    />
                    <input
                      type="text"
                      name="adress"
                      placeholder="Endereço"
                      value={editContact.adress}
                      onChange={handleEditInputChange}
                      style={{
                        borderRadius: 5,
                        border: "none",
                        padding: 10,
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={editContact.email}
                      onChange={handleEditInputChange}
                      style={{
                        border: "none",
                        padding: 10,
                        borderRadius: 5,
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleUpdateContact}
                      style={{
                        borderRadius: 10,
                        border: "none",
                        height: 35,
                        textAlign: "center",
                        width: "37%",
                        fontWeight: "900",
                        marginTop: 10,
                        backgroundColor: "green",
                        color: "#fff",
                      }}
                    >
                      Atualizar Contato
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#252536",
              width: 400,
              height: 200,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "white" }}>Contato adicionado com sucesso!</h2>
            <button
              onClick={() => setShowSuccessModal(false)}
              style={{
                borderRadius: 10,
                border: "none",
                height: 35,
                textAlign: "center",
                width: "50%",
                fontWeight: "900",
                marginTop: 10,
                backgroundColor: "green",
                color: "#fff",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#252536",
              width: 400,
              height: 200,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "white" }}>Tem certeza que deseja deletar?</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={confirmDeleteContact}
                style={{
                  borderRadius: 10,
                  border: "none",
                  height: 35,
                  textAlign: "center",
                  width: "50%",
                  fontWeight: "900",
                  backgroundColor: "red",
                  color: "#fff",
                }}
              >
                Sim
              </button>
              <button
                onClick={() => setShowDeleteConfirmModal(false)}
                style={{
                  borderRadius: 10,
                  border: "none",
                  height: 35,
                  textAlign: "center",
                  width: "50%",
                  fontWeight: "900",
                  backgroundColor: "gray",
                  color: "#fff",
                }}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
