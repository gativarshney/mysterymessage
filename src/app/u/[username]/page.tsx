import { notFound } from 'next/navigation'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/model/User'
import ProfileComposer from '@/components/ProfileComposer'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  return {
    title: `Send @${username} a message`,
    description: `Send @${username} an anonymous message on Mystery Message.`,
    openGraph: {
      title: `Send @${username} a message`,
      description: `Send @${username} an anonymous message on Mystery Message.`,
    },
  }
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params

  await dbConnect()
  const userExists = await UserModel.exists({ username })

  if (!userExists) {
    notFound()
  }

  return <ProfileComposer username={username} />
}
