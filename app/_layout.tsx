import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    /* 
      Como forma de otimizar e padronizar o meu código, eu crio um unico componente
      que servirá de cabeçalho para toda a navegação das rotas deste arquivo.
      O truque é fazer o componente Header() aparecer igualmente como cabeçalho
      em qualquer pagina da minha navegação em Stack
    */
    <Stack screenOptions={{ headerShown: false }}>

      /*
        O cabeçalho em um sistema de rotas no ReactNative por natureza
        passa parametros do tipo NativeStackHeaderProps toda vez que uma ação é feita
        esse tipo vem do proprio React, o que nós vamos fazer é usar isso a nosso favor
      */
      

      <Stack.Screen name='(groups)/index.tsx'/>
      <Stack.Screen name="(groups)/newRedacao"/>
      <Stack.Screen name="(groups)/editmodelo.tsx"/>
      <Stack.Screen name="(groups)/criarredacao.tsx"/>
    </Stack>
  );
}
