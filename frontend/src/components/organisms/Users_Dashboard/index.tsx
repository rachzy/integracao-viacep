import PrimaryButton from "@/components/atoms/PrimaryButton";
import CreateUserModal from "@/components/molecules/CreateUserModal";
import UserMap from "@/components/molecules/UserMap";
import { IUser } from "@/interfaces/User";

export default function UsersDashboard({ users }: { users: IUser[] }) {
  return (
    <div className="content-wrapper">
      <CreateUserModal />
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Usuários</h1>
            </div>
            <div className="col-sm-6">
              <div className="breadcrumb float-sm-right">
                <PrimaryButton
                  data-toggle="modal"
                  data-target="#modal-create-user"
                >
                  + Criar Usuário
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
            <UserMap users={users} />
          </div>
        </div>
      </section>
    </div>
  );
}
