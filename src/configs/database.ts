import pkg from '@prisma/client'

const { PrismaClient } = pkg
console.log('Postgres database connected.')
 
const prisma = new PrismaClient()

export {prisma}