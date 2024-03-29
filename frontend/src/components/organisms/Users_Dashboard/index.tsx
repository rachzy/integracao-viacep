import PrimaryButton from "@/components/atoms/PrimaryButton";
import CreateUserModal from "@/components/organisms/Modal_CreateUser";
import UserMap from "@/components/molecules/UserMap";
import ViewUserModal from "../Modal_ViewUser";
import ModalEditUser from "../Modal_EditUser";
import ModalDeleteUser from "../Modal_DeleteUser";
import Input from "@/components/atoms/Input";
import { useUserStore } from "@/store/user";
import ModalExportUsers from "../Modal_ExportUsers";

export default function UsersDashboard() {
  const searchValue = useUserStore((state) => state.searchValue);
  const setSearchValue = useUserStore((state) => state.setSearchValue);

  return (
    <div className="content-wrapper">
      <CreateUserModal />
      <ViewUserModal />
      <ModalEditUser />
      <ModalDeleteUser />
      <ModalExportUsers />
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Usuários</h1>
            </div>
            <div className="col-sm-6">
              <div className="col-sm-6 float-sm-left">
                <Input
                  placeholder="Buscar..."
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
              </div>
              <div className="col-sm-6 float-sm-right">
                <PrimaryButton
                  onClick={() => {
                    const button = document.querySelector(
                      "#modal-create-user-toggle"
                    ) as HTMLButtonElement;
                    button.click();
                  }}
                >
                  + Criar Usuário
                </PrimaryButton>
              </div>
              <div className="col-sm-6 float-sm-right mt-2">
                <PrimaryButton
                  className="btn-danger"
                  onClick={() => {
                    const button = document.querySelector(
                      "#modal-export-users-toggle"
                    ) as HTMLButtonElement;
                    button.click();
                  }}
                >
                  Exportar
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="card mb-3">
          <div className="card-header">
            <h3 className="card-title">Usuários</h3>
          </div>
          <div className="card-body p-0">
            <UserMap />
          </div>
        </div>
      </section>
    </div>
  );
}
