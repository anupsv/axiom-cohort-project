import MainLayout from '@/components/layout/MainLayout'
import ConnectWallet from '@/components/ui/ConnectWallet'
import LinkButton from '@/components/ui/LinkButton'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'


interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Home({ searchParams }: PageProps) {
  const address = searchParams?.address as string ?? "";
  console.log(searchParams);

  const renderButton = () => {
    return <LinkButton
        label="Build Axiom proof params"
        href={"/claim?"}
    />
  }

  return (
    <>
      <Title>
        Check Slashing
      </Title>
      <div className="text-center">
        BRB, we gotta slash people
      </div>
      { renderButton() }
    </>
  )
}
