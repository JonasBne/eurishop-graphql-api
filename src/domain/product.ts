// eslint-disable-next-line import/no-cycle
import { ProductDTO } from '../api/productsApi';

export default interface Product extends Omit<ProductDTO, 'id'> {
  id?: number
}
