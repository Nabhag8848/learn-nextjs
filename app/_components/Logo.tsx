import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icon.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image height="60" width="60" src="/icon.png" alt="The Wild Oasis logo" /> */}
      <Image height="60" width="60" src={logo} alt="The Wild Oasis logo" quality={100} />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
