import axios from 'axios'
import { AddressErrorSchema, AddressSchema } from '../types/addressSchemas'

export default async function getAddressByCep(cep: string): Promise<AddressSchema | null> {
  const url = `https://viacep.com.br/ws/${cep}/json/`

  try {
    const response = await axios.get<AddressSchema | AddressErrorSchema>(url)

    if ('erro' in response.data && response.data.erro) return null
    return response.data as AddressSchema
  } catch (error) {
    console.error('Failed to fetch address:', error)
    return null
  }
}
