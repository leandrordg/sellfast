import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, MessageCircleQuestionIcon } from "lucide-react";

const faqItems = [
  {
    id: "1",
    title: "Como altero minha senha?",
    content:
      "Para alterar sua senha, vá até a página de perfil e clique em 'Alterar senha'.",
  },
  {
    id: "2",
    title: "Quais são os métodos de pagamento?",
    content:
      "Atualmente aceitamos cartão de crédito, débito e boleto bancário.",
  },
  {
    id: "3",
    title: "Meu pedido não chegou, o que faço?",
    content:
      "Entre em contato com nosso suporte para que possamos verificar o status do seu pedido.",
  },
  {
    id: "4",
    title: "Quanto tempo demora para meu pedido chegar?",
    content:
      "O prazo de entrega varia de acordo com a sua localização e o método de entrega escolhido.",
  },
  {
    id: "5",
    title: "Como faço para cancelar meu pedido?",
    content:
      "Para cancelar seu pedido, entre em contato com nosso suporte informando o número do pedido.",
  },
];

export default function Page() {
  return (
    <div className="h-full md:py-6 lg:py-10 rounded-lg space-y-6">
      <CustomBreadcrumb />

      <h1 className="text-xl font-semibold">Suporte</h1>

      <p className="text-muted-foreground text-sm">
        Alguns links úteis para te ajudar a resolver problemas comuns. Se você
        não encontrar o que procura, entre em contato com nosso suporte logo
        abaixo.
      </p>

      <Accordion type="single" collapsible>
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={item.id}>
            <AccordionTrigger>{`${item.id}. ` + item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* 2 methods of support, online chat and call */}
      <div className="flex space-x-4">
        <Button variant="default" size="sm">
          <MessageCircleQuestionIcon className="size-4 mr-2" />
          Chat online
        </Button>
        <Button variant="link" size="sm">
          Ligar para o suporte <ExternalLinkIcon className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
