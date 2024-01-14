export default function CardHeader({ title }: { title: string }) {
  return (
    <div className="card-header">
      <h1 className="mb-0 text-center">
        <b>{title}</b>
      </h1>
    </div>
  );
}
