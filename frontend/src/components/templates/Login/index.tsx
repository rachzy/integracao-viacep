import CardHeader from "@/components/atoms/CardHeader";
import LoginForm from "@/components/organisms/LoginForm";

export default function LoginTemplate() {
  return (
    <div className="login-page bg-body-secondary">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <CardHeader title="Autenticação" />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
