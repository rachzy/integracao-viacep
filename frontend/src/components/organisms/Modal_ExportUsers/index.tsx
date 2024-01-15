import Modal from "@/components/atoms/Modal";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useUserStore } from "@/store/user";
import filterUsersBySearchValue from "@/util/filterUsersBySearchValue";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";

export default function ModalExportUsers() {
  const users = useUserStore((state) => state.users);
  const searchValue = useUserStore((state) => state.searchValue);

  const generatePDF = useReactToPrint({
    content: () => document.querySelector("#user-table"),
    documentTitle: "Usuários",

    onAfterPrint: () => alert("Usuários salvos em PDF"),
  });

  const filteredUsers = filterUsersBySearchValue(users, searchValue);
  const csvData = [
    [
      "Nome",
      "CPF",
      "E-mail",
      "Telefone",
      "Data de nascimento",
      "Endereço",
      "Bairro",
      "Número",
      "Complemento",
      "Cidade",
      "Estado",
      "CEP",
    ],
    ...filteredUsers.map(({ name, cpf, email, phone, birthdate, address }) => [
      name,
      cpf,
      email,
      phone,
      birthdate,
      address.street,
      address.neighborhood,
      address.number,
      address.complement,
      address.city,
      address.state,
      address.cep,
    ]),
  ];

  return (
    <Modal id={"modal-export-users"} title="Exportar usuários">
      <div className="d-inline">
        <div className="col-sm-6 float-sm-left">
          <PrimaryButton className="btn-danger" onClick={generatePDF}>
            Exportar PDF
          </PrimaryButton>
        </div>
        <div className="col-sm-6 float-sm-right">
          <CSVLink filename="usuarios.csv" data={csvData}>
            <PrimaryButton className="btn-success" onClick={() => {}}>
              Exportar CSV
            </PrimaryButton>
          </CSVLink>
        </div>
      </div>
    </Modal>
  );
}
