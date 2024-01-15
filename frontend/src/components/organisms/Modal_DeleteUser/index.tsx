import { UserAPI } from "@/api/UserAPI";
import Modal from "@/components/atoms/Modal";
import { useModalStore } from "@/store/modal";
import { useUserStore } from "@/store/user";

export default function ModalDeleteUser() {
  const user = useModalStore((state) => state.user);
  const deleteUser = useUserStore((state) => state.deleteUser);

  async function handleButtonClick(): Promise<boolean> {
    if (!user || !user._id) return false;

    const result = await UserAPI.delete(user._id);

    if (!result) return true;

    deleteUser(user._id);
    return false;
  }

  return (
    <Modal
      id={"modal-delete-user"}
      title={"Deletar usuário"}
      button={{ label: "Deletar", type: "danger", onClick: handleButtonClick }}
    >
      <div>
        <p>Tem certeza que deseja deletar esse usuário?</p>
      </div>
    </Modal>
  );
}
