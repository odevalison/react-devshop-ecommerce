export const formatPrice = (price: number): string => {
  const formattedPrice = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  return formattedPrice;
};
