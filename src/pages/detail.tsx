import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contact } from "../DTO/ContactDTO";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Detail() {
  const [contact, setContact] = useState<Contact>({} as Contact);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3333/contact/${id}`).then((data) =>
      data.json().then((response) => setContact(response))
    );
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 120,
      }}
    >
      {/* IMG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-circle-user"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="10" r="3" />
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
      </svg>

      {/* NOME */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h2 style={{ fontWeight: 500 }}>
          {contact.name} {contact.lastname}
        </h2>
      </div>

      {/* TELEFONE */}

      <div
        style={{
          backgroundColor: "#b9b9b9",
          width: "50%",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
          textAlign: "center",
        }}
      >
        <div
          style={{
            paddingLeft: 10,
            width: "8%",
            height: 60,
            backgroundColor: "#807d7d",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-phone"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {/* <h2 style={{ fontFamily: "monospace", fontSize: 20 }}>TELEFONE</h2> */}
        </div>
        <h3 style={{ marginRight: 20, width: "75%" }}>{contact.phone}</h3>
      </div>

      {/* ENDERECO */}
      <div
        style={{
          backgroundColor: "#b9b9b9",
          width: "60%",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <div
          style={{
            paddingLeft: 10,
            width: "8%",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#807d7d",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            textAlign: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-map-pinned"
          >
            <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
            <circle cx="12" cy="8" r="2" />
            <path d="M8.835 14H5a1 1 0 0 0-.9.7l-2 6c-.1.1-.1.2-.1.3 0 .6.4 1 1 1h18c.6 0 1-.4 1-1 0-.1 0-.2-.1-.3l-2-6a1 1 0 0 0-.9-.7h-3.835" />
          </svg>
          {/* <h3 style={{ fontFamily: "monospace", fontSize: 19 }}>ENDEREÇO</h3> */}
        </div>
        <h3 style={{ marginRight: 50, width: "75%" }}>{contact.adress}</h3>
      </div>
      {/* EMAIL */}
      <div
        style={{
          backgroundColor: "#b9b9b9",
          width: "70%",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        <div
          style={{
            paddingLeft: 10,
            width: "8%",
            height: 60,
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor: "#807d7d",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-mail"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          {/* <h3 style={{ fontFamily: "monospace", fontSize: 19 }}>EMAIL</h3> */}
        </div>
        <h3 style={{ marginRight: 60, width: "80%" }}>{contact.email}</h3>
      </div>
    </div>
  );
}
