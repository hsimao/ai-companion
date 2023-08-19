import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { src, name, description, instructions, seed, categoryId } = body
    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // TODO: check subscription
    const companion = await prismadb.companion.create({
      data: {
        userId: user.id,
        userName: user.firstName,
        categoryId,
        src,
        name,
        description,
        instructions,
        seed,
      },
    })

    return NextResponse.json(companion)
  } catch (error) {
    console.log('[COMPANION_POST]', error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}
