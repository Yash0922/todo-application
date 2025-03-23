import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative w-12 h-12">
        <Image src="/logo.svg" alt="Todo Logo" fill priority />
      </div>
      <h1 className="text-2xl font-bold">TODO</h1>
    </Link>
  );
};

export default Logo;