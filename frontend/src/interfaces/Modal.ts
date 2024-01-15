export interface IModal {
  id: string;
  title: string;
  children: React.ReactNode;
  button?: {
    label: string;
    onClick?: () => boolean | Promise<boolean>;
  };
}
