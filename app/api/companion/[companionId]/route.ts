import { NextResponse } from 'next/server'

import { auth, currentUser } from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } },
) {
  if (!params.companionId) {
    return new NextResponse('Companion ID is required', { status: 400 })
  }
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
    const companion = await prismadb.companion.update({
      where: {
        id: params.companionId,
      },
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
    console.log('[COMPANION_PATCH]', error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { companionId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const companion = await prismadb.companion.delete({
      where: {
        userId,
        id: params.companionId,
      },
    })

    return NextResponse.json(companion)
  } catch (error) {
    console.log('[COMPANION_DELETE]', error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}
