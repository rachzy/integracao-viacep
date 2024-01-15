export interface IModal {
  id: string;
  title: string;
  children: React.ReactNode;
  button?: {
    label: string;
    type?: "success" | "danger" | "primary";
    onClick?: () => boolean | Promise<boolean>;
  };
}
