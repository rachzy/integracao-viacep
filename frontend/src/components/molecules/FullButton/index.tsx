import PrimaryButton, {
  IProps as IButtonProps,
} from "@/components/atoms/PrimaryButton";

interface IProps extends IButtonProps {
  props?: IButtonProps;
  children: React.ReactNode;
}

export default function FullButton(props: IProps) {
  return (
    <div className="w-100 d-inline-flex align-items-center">
      <PrimaryButton {...props.props} onClick={props.onClick}>{props.children}</PrimaryButton>
    </div>
  );
}
