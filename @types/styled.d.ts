import 'styled-components/native'
import theme from '@/theme'

/*
  LEIA ------------- IMPORTANTE ------------------ LEIA
  
  Aqui nós criamos nossa própria tipagem dentro do sistema base do TS(JS),
  obviamente ela não é universal, fica restrita a esse projeto.
  Criar a tipagem nesse nivel de sistema significa que em qualquer lugar que
  o tipo que nós estamos criando for chamado, ele será passado com as configs
  e definições que fazemos aqui.
  Nesse caso o truque é sobrescrever o tipo de tema padrão o TS (DefaultTheme), 
  que é o bom e velho Light e Dark pelo nosso.
  Depois que esse arquivo for reconhecido pelo sistema, todos que usarem o
  tema padrão do sistema receberão o nosso tema personalizado.
*/

declare module 'styled-components/native'{
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType { }
};