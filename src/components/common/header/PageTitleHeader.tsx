import Link from "next/link";

export default function PageTitleHeader({ title }: { title: string }) {
  return (
    <>
      <div className="flex justify-between">
        <Link href={"/login"}>
          <p>↩️</p>
        </Link>
        <p className="font-medium text-lg">{title}</p>
        <Link href={"/"}>
          <p>❌</p>
        </Link>
      </div>
    </>
  );
}
