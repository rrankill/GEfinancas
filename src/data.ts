import type { Order } from "./types";

export const orders: Order[] = [
  {
    code: "#FN-1048",
    date: "22 mai 2025",
    total: "R$ 4.248,00",
    pending: false,
    lines: [
      { name: "Vergalhão CA-50 10mm", detail: "12m · 40 unidades", value: "R$ 2.184,00" },
      { name: "Tubo galvanizado 2”", detail: "6m · 12 unidades", value: "R$ 1.134,00" },
      { name: "Chapa de aço 3mm", detail: "2×1m · 4 unidades", value: "R$ 930,00" },
    ],
  },
  {
    code: "#FN-1052",
    date: "23 mai 2025",
    total: "R$ 1.860,00",
    pending: true,
    lines: [
      { name: "Cantoneira 1” x 1/8”", detail: "6m · 20 unidades", value: "R$ 1.140,00" },
      { name: "Barra chata 1” x 1/4”", detail: "6m · 8 unidades", value: "R$ 720,00" },
    ],
  },
  {
    code: "#FN-0983",
    date: "20 mai 2025",
    total: "R$ 2.890,50",
    pending: false,
    lines: [
      { name: "Viga U 100mm", detail: "6m · 6 unidades", value: "R$ 1.240,50" },
      { name: "Tela soldada Q92", detail: "2×3m · 10 unidades", value: "R$ 980,00" },
      { name: "Arame recozido 18", detail: "rolo 1kg · 20 unidades", value: "R$ 670,00" },
    ],
  },
  {
    code: "#FN-0951",
    date: "18 mai 2025",
    total: "R$ 6.420,00",
    pending: false,
    lines: [
      { name: "Vergalhão CA-50 12mm", detail: "12m · 60 unidades", value: "R$ 3.150,00" },
      { name: "Perfil metalon 50x30", detail: "6m · 15 unidades", value: "R$ 2.270,00" },
      { name: "Eletrodo 6013", detail: "caixa 5kg · 10 unidades", value: "R$ 1.000,00" },
    ],
  },
];

// temporário: as telas de detalhes ainda usam esta lista (some na rodada 2)
export const ordersLines = orders[0].lines;