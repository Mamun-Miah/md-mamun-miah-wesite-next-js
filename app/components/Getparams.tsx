'use client'

import React from 'react'
import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams()
  const slug = params.slug

  return (
    <div>Slug: {slug}</div>
  )
}

export default Page
