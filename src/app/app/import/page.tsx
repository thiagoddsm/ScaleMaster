"use client"

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAppData } from '@/context/AppDataContext';
import { Loader2, UploadCloud } from 'lucide-react';
import { collection, writeBatch, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Volunteer } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

type VolunteerToImport = Omit<Volunteer, 'id'> & { team: string | null };

// --- TEMPORARY DATA FOR IMPORT ---
const csvData: string = `NOME,MINISTÉRIO,CELULAR,EMAIL
ADALGIZA PEREIRA DE LIRA,RECEPÇÃO,(21)98954-2700,
ADRIANA DA SILVA SOUZA DE SA,INTERCESSÃO,(21)96448-5279,adrianadesa81@gmail.com
ADRIANA MARTINS DOS SANTOS ALMEIDA,DIS,(21)98813-0936,amsa5677@gmail.com
ADRIANO ALCANTARA RIBEIRO,"PROFESSORES,STAFF",(21)98564-3030,adrianoalcantararibeiro@gmail.com
ADRYELY SIMONARD SANTOS SILVA,FOTOGRAFIA,(21)96554-1299,adryelysimonard20@gmail.com
ALESSANDRO DE CASTRO CAMPOS,BISTRO,(21)96467-2779,alecampos0709@gmail.com
ALESSANDRO DE SOUZA SILVA,ILUMINAÇÃO,(21)99162-2979,alessandroitilbr@hotmail.com
ALEX LEONI SANTOS DE PAIVA,PROJEÇÃO,(21)98585-7696,alexleonisp23@gmail.com
ALEX DA SILVA CALDAS,STAFF,(21)98769-7374,ascaldas.silva@gmail.com
ALEX LOURENÇO MADUREIRA,ESTACIONAMENTO,(21)99151-8935,alex.madureira@outlook.com
AMANDA ASSUMPÇÃO ALBERNAZ,EQUIPE VERMELHA,(21)98865-7710,soparaconcursos10@gmail.com
AMANDA MELYSSA FREIRE PINTO,EQUIPE VERMELHA,(21)96688-5110,amandinhamelyssa@gmail.com
ANA CLAUDIA FERREIRA AMARAL FEITOSA,"EQUIPE AMARELA,ESPAÇO VIP",(21)98688-2786,ana.feitosa.claudia@outlook.com
ANA BEATRIZ FERNANDES DE SOUZA,EQUIPE AZUL,(21)99966-6129,anabeatrizfdesouza@gmail.com
ANA BEATRIZ OLIVEIRA LOPES BRAGA,EQUIPE VERDE,(21)98988-1954,bragaanabeatriz43@gmail.com
ANA CARLINDA CAMPOS DE SOUZA,FOTOGRAFIA,(21)99626-9005,anacarlindacamposde souza@hotmail.com
ANA CAROLINA JANUÁRIO ALVES,"EQUIPE AMARELA,EQUIPE AZUL",(21)96806-5661,anacbjanuario@gmail.com
ANA CAROLLINE GOMES DE OLIVEIRA NASCIMENTO,"DIS,EQUIPE AMARELA",(21)99430-0547,carol.olvnascimento@gmail.com
ANA CLAUDIA LÁZARO DE SOUZA VERAS,EQUIPE VERMELHA,(21)96418-8743,anaclaudia.lazzaro@gmail.com
ANA CRISTINA LEAL DOS SANTOS TEIXEIRA,RECEPÇÃO,(21)99966-5813,anacris.leal2@gmail.com
ANA ELISA BARBOSA TRINDADE,BOUTIQUE,(21)98109-6830,anaelisatrin@gmail.com
ANA ELÍSIA FERREIRA DA SILVA,"EQUIPE VERMELHA,RECEPÇÃO",(21)95904-5149,aelisiaf@gmail.com
ANA JÚLIA PONTES DA SILVA RIBEIRO,"EQUIPE AMARELA,RECEPÇÃO",(21)99764-3990,anajulia200264@hotmail.com
ANA KAROLINE LUCAS DUARTE,EQUIPE VERMELHA,(21)99850-1700,anaklucas19@gmail.com
ANA LÚCIA FERNANDES DE CARVALHO BALTHAR,EQUIPE AMARELA,(21)97748-7337,kx11243@gmail.com
ANA LÚCIA LEMOS FERREIRA,COFFE BREAK,(21)97473-1872,lemosanalucial16@gmail.com
ANDERSON DOS SANTOS BATISTA,INTERCESSÃO,(21)97004-6708,andersonbaptista26@hotmail.com
ANDERSON FELIPE CAMINHA,SOM,(21)98500-5129,acaminha31@gmail.com
ANDERSON RIBEIRO DA SILVA,STAFF,(21)99472-2481,ars231075@gmail.com
ANDRÉ FELIPE DA SILVA,"BISTRO,COORDENAÇÃO DE CULTO,ESPAÇO VIP",(21)98235-8612,andrefelipe311713@gmail.com
ANDRE LEONI SANTOS DE PAIVA,ILUMINAÇÃO,(21)98739-6763,dedeleonipaiva@gmail.com
ANDREA BARBOSA PEREIRA MEIRELLES,RECEPÇÃO,(21)97644-4906,andreameirelllles@gmail.com
ANDREA CHRISTIANE CAVALCANTI DE GOES,RECEPÇÃO,(21)96449-2328,andreagoes30@gmail.com
ANDRESSA SILVEIRA DA CRUZ ROZA,MUSIKIDS,(21)96815-5025,andressacruz29@gmail.com
ANDREZA DUARTE COSTA,EQUIPE AZUL,(21)96624-7595,andrezaduarte77@gmail.com
ANNA CLARA COUTINHO DA SILVA,FOTOGRAFIA,(21)97190-1778,claracout1409@gmail.com
ARISLÉDIO FERREIRA DA SILVA,APOIO,(21)98104-1093,leo.f.silva48@gmail.com
ARTHUR MESQUITA DA CRUZ,PROJEÇÃO,(21)99632-8734,artmecruz@gmail.com
ARTHUR VICTOR DE OLIVEIRA SILVA,SOM,(21)99431-1438,victorroot20@gmail.com
ASAFE FERREIRA DE MELLO,FOTOGRAFIA,(21)96430-8825,asafe mello@hotmail.com
BEATRIZ ABREU DOS SANTOS,RECEPÇÃO,(21)99505-8279,abreubiasantos@gmail.com
BEATRIZ ALMEIDA CUNHA BELLOT DE SOUZA,BISTRO,(21)99515-9274,bebellot13@gmail.com
BEATRIZ RODRIGUES MANHÃES MARINS,PROJEÇÃO,(21)97172-7635,beatrizmarins035@gmail.com
BEATRIZ SOUZA DA SILVA,EQUIPE AZUL,(21)98525-8249,bt240596@gmail.com
BERNARDO LEITE LESSA CAETANO,BROADCASTING,(21)99031-9817,bernardollcaetano007@gmail.com
BIANCA MONTEIRO BACELAR LOPES,BOUTIQUE,(21)99269-1807,biancamblopes@gmail.com
BIANCA CALISPTO MONTEIRO DA SILVA,EQUIPE AZUL,(21)99854-8562,biacalispto@hotmail.com
BRENO MAYRINK NASCIMENTO GUEDES,CLEANING,(21)97011-5422,brenomayrinkn@gmail.com
BRUNA CAMACHO LONGOBUCO,EQUIPE AMARELA,(21)99489-6964,bclongobuco@gmail.com
BRUNA DIAS DE SANT'ANNA CORREA,PROJEÇÃO,(21)99334-0114,brunacorrea406@gmail.com
BRUNA DO NASCIMENTO RIBEIRO,STORIES,(21)98472-4096,inf.brunaribeiro@gmail.com
BRYAN DE CARVALHO SANTORO,PROJEÇÃO,(21)92019-3895,bryansanttoro@gmail.com
CAMILLE DIAS QUARESMA,BROADCASTING,(21)96957-4709,camilledias8@gmail.com
CARLA DA SILVA BERRIEL BATISTA,INTERCESSÃO,(21)96489-0808,cbb.berriel@gmail.com
CARLOS ANTÔNIO MENDONÇA BORGES JUNIOR,"ESTACIONAMENTO,RECEPÇÃO",(21)97508-8386,carlosjunior.cj536@gmail.com
CARLOS FABRÍCIO LOBO THURLER,APOIO,(21)98647-4211,fabriciothurler@gmail.com
CARLOS HENRIQUE LIMA GUEDES,"ESPAÇO VIP,ESTACIONAMENTO",(21)98540-2263,chlguedes@hotmail.com
CARLOS MAGNO PACHECO DOS SANTOS,ESTACIONAMENTO,(21)99967-7437,magnopacheco47@gmail.com
CAROLAINE SANTOS MORETSON COUTINHO,EQUIPE AMARELA,(21)96778-7549,moretsoncarol@gmail.com
CAROLINA FARIA GONÇALVES TRUGILHO,FOTOGRAFIA,(21)98139-8761,carolinafaria.adv@gmail.com
CAROLINE NOGUEIRA DA SILVA,RECEPÇÃO,(22)96444-0087,cns.nogueira87@gmail.com
CÁSSIO LUIZ MARQUES WELBERT,ILUMINAÇÃO,(21)99945-1256,potassio.cm@gmail.com
CINTHIA REIS ALENTEJO,EQUIPE VERMELHA,(21)98821-9478,cinthiaalentejo@hotmail.com
CÍNTIA DOS ANJOS MOURA AMORIM,RECEPÇÃO,,cintiaanjos.amorim@hotmail.com
CINTIA ALMEIDA ABREU,EQUIPE VERDE,(21)98865-8805,cintiaalmeida@myyahoo.com
CINTIA GOMES DE SOUZA SOARES,RECEPÇÃO,(21)97285-9913,cintia.gsoares09@gmail.com
CINTIA MENDES MACEDO RODRIGUES,EQUIPE AMARELA,(21)97449-2776,cintia.psicopedagoga75@gmail.com
CLARA VICTOR FIUZA MOREIRA LIMA,FOTOGRAFIA,(21)97604-3849,clarafiuzal@gmail.com
CLAUDIA REGINA DE CARVALHO MONTEIRO BACELAR,"RECEPÇÃO,EQUIPE AMARELA",(21)98985-9412,claudiamonteirobacelar@gmail.com
CLAUDIO DA SILVA JUNIOR,FOTOGRAFIA,(21)98041-6241,claudio.eng.jr@gmail.com
CLAUDIO RENATO VEIGA RABELLO,"INTERCESSÃO,RECEPÇÃO",(21)96989-1357,claurabello22@gmail.com
CLAUDIO ROGERIO INACIO DE FARIAS,CLEANING,(21)98113-3648,claudio.i.farias@gmail.com
CLEIDE FERREIRA DA COSTA MONTEIRO,APOIO,(21)98479-2451,
CLINTON TAVARES BARRETO,SECURITY,(21)97036-8150,clinton.tecnocon@gmail.com
CYNTIA HAASE PUPO,BISTRO,(21)99592-6236,cyntia haase@hotmail.com
DANIEL PEREIRA SOTA,RECEPÇÃO,(21)97582-7076,dpereirasota@gmail.com
DANIEL SILVA DOS SANTOS,"SOM,SAÚDE",(21)99722-2739,dsds.danielsilvadossantos@gmail.com
DANIEL VELOSO LOPES,BROADCASTING,(21)99470-5758,danielvelosolopes@hotmail.com
DANIELE DA SILVA PEREIRA SOTA,COORDENAÇÃO DE CULTO,(21)99250-0763,daniellecasal@gmail.com
DANIELLE NUNES SANTOS,EQUIPE VERDE,(21)97208-9233,daniellenu85@gmail.com
DAVI NOGUEIRA FERREIRA,SOM,(21)99874-5767,davinog0409@gmail.com
DAVI PEREIRA SOTA,RECEPÇÃO,(21)97698-8283,
DAVID OLIVEIRA DE MORAES,BOUTIQUE,(21)97385-8704,davidmoraes7210@gmail.com
DAYSE LUCY DA SILVA SOUZA,BROADCASTING,(21) 99900-0112,dayselsouza@yahoo.com.br
DELCIR VIEIRA DOMINGOS,"BROADCASTING,STORIES",(21)98818-7537,delcir.domingos@gmail.com
DEUSILEA COSTA,COFFE BREAK,(21)99626-6799,deusileacosta2015@gmail.com
DEYVSON MACIEL CAETANO,BISTRO,(21)98299-0572,deyvsonmaciel@yahoo.com.br
DHEMERSON GOMES MARINS,EQUIPE AMARELA,(21)98678-8956,dhemersongm@gmail.com
DOUGLAS DOS SANTOS DA CONCEIÇÃO,"VIP,BISTRO",(21)98097-9351,douglas.da.conceicao@hotmail.com
ÉDERLON DA SILVA CAMPANATTI,CLEANING,(21)98939-5820,ederloncampanatti@hotmail.com
EDILMA DA SILVA TOMAZ,MUSIKIDS,(21)98156-7344,edilmatomaz14@gmail.com
EDNA DA SILVA TEIXEIRA,EQUIPE AZUL,(22)98852-3117,ednasteixeiraa@gmail.com
EDUARDA ARRAIS BARBOSA,FOTOGRAFIA,(21)96763-5641,eduardaarraisjobs@gmail.com
EDUARDO DOS SANTOS COSTA,ILUMINAÇÃO,(21)99894-2998,duduguitar@yahoo.com.br
ELAINE PEREIRA DA SILVA MADUREIRA,RECEPÇÃO,(21)99255-8165,nannyalegria2012@gmail.com
ELIAKIM PEREIRA DA SILVA,EQUIPE VERMELHA,(21)99159-7038,eliakimsilva@gmail.com
ELIAS FERNANDES DOS SANTOS FREITAS,"BROADCASTING,EQUIPE VERMELHA",(21)96660-3361,efreitasdg@gmail.com
ELIEZER DA SILVA ALMEIDA,CLEANING,(21)96977-2042,eliezer.almeida@crf-rj.org.br
ELISA ALVES THURLER,RECEPÇÃO,(21)98928-4262,elisathurler@gmail.com
ELISA OLIVEIRA DA SILVA,"EQUIPE AZUL,EQUIPE VERMELHA",(21)97587-7403,almeida.o.elisa@gmail.com
ELISANGELA PAES CAMPOS,EQUIPE VERDE,(21)98020-9483,elisangela.paes0709@gmail.com
ELIZANGELA BRUSKI DE JESUS,RECEPÇÃO,(21)98775-2282,corujinha25@gmail.com
ELIZETE AZEVEDO DA SILVA MARTINS,MUSIKIDS,(21)97179-8359,elizete.dayfels@gmail.com
ELOISA SILVA BATISTA,EQUIPE AZUL,,eloisasiilva47@gmail.com
EMMANOEL DA SILVA ABREU,FOTOGRAFIA,(21)99253-7000,emmanoel2015@gmail.com
ERICK DA COSTA MONTEIRO,"CLEANING,EQUIPE VERMELHA",(21)99909-0607,erickcostamonteiro@gmail.com
ERIKA SANTOS COUTO RAINHA,EQUIPE VERDE,(21)99351-4706,erika andrade50@yahoo.com.br
ESTEPHANY DE OLIVEIRA MONTEIRO,RECEPÇÃO,(21)99025-6833,estephanyo16@gmail.com
ESTHER ALVES DA SILVA,"EQUIPE VERMELHA,EQUIPE AMARELA",(21)97539-8012,alvesesther04@gmail.com
EUGENIO COSTA CABRAL,FOTOGRAFIA,(21)98120-0396,eugeniocostacabral@hotmail.com
EVANILDA DA SILVA CORREA,"CLEANING,EQUIPE VERMELHA",(21)99560-1460,evanildacorrea@hotmail.com
EVANILDE MELO DE SOUZA SILVA,EQUIPE VERDE,(21)98779-5577,evanildemssilva@gmail.com
EVELLYN NUNES TAVEIRA PORTO,RECEPÇÃO,(21)99679-2688,evellynnt@gmail.com
EVELYN ALVES DE ARAÚJO BASTOS,EQUIPE AMARELA,(21)98003-1090,evbastos@id.uff.br
EVELYN LORENA DE CARVALHO CAMILO,FOTOGRAFIA,(21)99654-7302,evelynccamilo@icloud.com
EVERSON TRINDADE DOS SANTOS,PROJEÇÃO,(21)98088-6205,eversontrin@gmail.com
FABIANE PORTO MOURA DE SOUZA,SOM,(21)96406-1840,biane07@hotmail.com
FABIO FERREIRA SOTA,"ILUMINAÇÃO,EQUIPE AZUL",(21)97005-9442,fabio.brothers2018@gmail.com
FELIPE MUNIZ DOMINGOS,RECEPÇÃO,(21)98816-3192,felipemunizdomingos@gmail.com
FELIPE SILVA DE OLIVEIRA,"APOIO,COORDENAÇÃO DE CULTO,ESPAÇO VIP",(21)99801-4525,felipe.silva.oliveira@gmail.com
FERNANDA LOPES DOS SANTOS HORSTH,STAFF,(21)98427-9493,fehorsth81@gmail.com
FERNANDO SILVA MANFREDI,"COORDENAÇÃO DE CULTO,ESPAÇO VIP",(21)96499-2240,fernandodsg@yahoo.com.br
FILIPE ALVES DE SANT'ANNA,RECEPÇÃO,(21)98319-3051,filipeads98@gmail.com
FILIPE DA SILVA NUNES,EQUIPE AZUL,(21)97693-1528,ofilipenunes@gmail.com
FLAVIA VANESSA FIGUEIRA FLORES,"INTERCESSÃO,RECEPCÃO",(21)99649-8313,flaviavanessafff@gmail.com
FLAVIO TAVARES MARQUES,ESTACIONAMENTO,(21)98390-8530,flaviomarques1985@gmail.com
FRANCILENE MATIAS DA SILVA PATROCÍNIO,BISTRO,(21)98134-8993,francipatrocinio@hotmail.com
FRANCINE ALMEIDA LIBORIO DE ARAUJO,RECEPÇÃO,(21)97908-7276,francinealmeida80@yahoo.com
FRANCIS FERREIRA VILLAÇA,BROADCASTING,(21)98271-3395,francisvillaca.c@gmail.com
FREDERICO FONSECA DA SILVA PINTO,ESTACIONAMENTO,(21)99937-4663,adm.fred01@gmail.com
GABRIEL DOS SANTOS FERNANDES,FOTOGRAFIA,(21)99424-0830,feernandesgabriel@gmail.com
GABRIEL DA SILVA GONÇALVES,RECEPÇÃO,,gabrielsilvagoncalves590@gmail.com
GABRIEL ELIAS DE SOUZA SIDACO ROSA,STAFF,(21)98557-5755,gabriel-sidaco@hotmail.com
GABRIEL PEREIRA DA SILVA,ESTACIONAMENTO,(21)99356-9988,gpsx.98@gmail.com
GABRIEL SOUZA ALMADA,EQUIPE AZUL,(21)96444-5694,gabrielanjos0107@gmail.com
GABRIELA CASTRO NUNES,BROADCASTING,(21)97702-8852,hbrielacastro@gmail.com
GABRIELA PIRES MARINS DE OLIVEIRA,RECEPÇÃO,(21)98952-4297,gabi.pmdo@gmail.com
GABRIELE IGNACIO CASTILHO SENA,EQUIPE AMARELA,(21)97886-3403,gabrielecsena@gmail.com
GABRIELLA DA SILVA NUNES,RECEPÇÃO,(21)96636-9642,ggabinunes35@gmail.com
GABRIELLA PEREIRA SANT'ANNA,EQUIPE VERMELHA,(21)99805-2776,gabriellapereira01@gmail.com
GEANE MUNIZ MESQUITA DOMINGOS,"EQUIPE AMARELA,RECEPÇÃO",(21)96735-4202,muniz.geane@gmail.com
GENI PEREIRA DA CRUZ SANTANNA,"EQUIPE AMARELA,RECEPÇÃO",,genisantanna65@gmail.com
GILLIANE CELIZE DA COSTA RODRIGUES DE MOURA,"ESPAÇO VIP,INTERCESSÃO,RECEPÇÃO",(21)98025-0241,gilly.rodrigues@hotmail.com
GILSON MONTEIRO DE CARVALHO HORSTH,STAFF,(21)98782-4362,gilsonhorsth@gmail.com
GIOVANA ROSA DOS SANTOS FREITAS,"BISTRO,RECEPÇÃO",(21)99114-8055,giovanarosafreitas@gmail.com
GIOVANNA MENCARI XAVIER,FOTOGRAFIA,(21)98723-2851,gimencarix@gmail.com
GISELE FONSECA SANTOS ROCHA,PROJEÇÃO,(21)99326-7508,giselesantosfg@hotmail.com
GISELLE QUEIROZ PONTES,CLEANING,(21)98782-8469,giselle.qp2012@gmail.com
GIULIA ACZA MOREIRA GUEDES,STORIES,(21)95902-7368,guedesgiuliall@gmail.com
GIZELLE CAMPOS DE MESQUITA,CLEANING,(21)99620-3738,78gmsantos@gmail.com
GUILHERME ARAÚJO DE OLIVEIRA,FOTOGRAFIA,(21)98645-0100,guimoisal2@gmail.com
HADASSA RODRIGUES LIMA,"CLEANING,EQUIPE VERMELHA",(21)98664-2033,lrhada18@gmail.com
HENRIQUE NELAS LONGOBUCO,"ESPAÇO VIP,MUSIKIDS,PROFESSORES",(21)98797-2005,longobuco@gmail.com
HEVERSON BERNARDO DE SOUZA,"COORDENAÇÃO DE CULTO,ESPAÇO VIP",(21)96465-6672,blax.atos2@gmail.com
HIAGO CAMPOS MARENDINO,RECEPÇÃO,(21)96522-7053,hiagocampos84@gmail.com
IASMIN NUNES SALES GUIMARÃES,EQUIPE AZUL,(21)96468-5635,iasminnunessales@gmail.com
ÍCARO DE PAIVA MAIA FERREIRA,PROJEÇÃO,(21)99847-7393,icaropmf@gmail.com
IRENE GOMES DE CARVALHO DUARTE,"CLEANING,ESPAÇO VIP,INTERCESSÃO",(21)98740-5341,irenegdcd@gmail.com
ISABELA ALVES THURLER,EQUIPE VERMELHA,(21)98111-1111,belathurler@gmail.com
ISABELA DOS SANTOS TEIXEIRA BARRETO,BOUTIQUE,(21)97392-4224,isabelateeixeira@gmail.com
ISABELA SODRE CHAME TAVARES DO COUTO,EQUIPE VERMELHA,(21)96556-2840,isabelastavares@gmail.com
ISABELLA DOS ANJOS AMORIM,FOTOGRAFIA,(21)97622-4989,isabelladosanjos08@gmail.com
ISABELLA GUINANCIO NASCIMENTO,"DIS,EQUIPE VERDE",(21)99796-1796,isabellaguinancio@id.uff.br
ISABELLE NUNES DA CONCEIÇÃO DE SOUZA,MUSIKIDS,(21)99222-3133,be_belle@live.com
ISAIAS DUARTE MESQUITA,CLEANING,(21)97898-5814,duarrte@gmail.com
IVONE MARIA LUCIO,CLEANING,(21)99400-6562,ivonelucio21@gmail.com
IZAAK SALEK DE OLIVEIRA CURY MERLIM,MUSIKIDS,(21)98198-3033,izaaksalek@gmail.com
IZABELLA TAVARES GONÇALVES SILVA,INTERCESSÃO,(21)98735-9652,izabellatavares48@gmail.com
JAININE GOMES PEREIRA,RECEPÇÃO,(21)97374-8551,jaininegomes@gmail.com
JAQUELINE DE OLIVEIRA AZEVEDO,PROJEÇÃO,(21)98061-7052,jaquelineoa@hotmail.com
JEAN MORAES DA SILVA,"BROADCASTING,COORDENAÇÃO DE CULTO,PROFESSORES",(21)99690-0553,contatojeanmoraes2@gmail.com
JECIANA BRUM PEREIRA OLIVEIRA,EQUIPE VERDE,(21)98815-6567,nanabrum@hotmail.com
JEFFERSON BARROSO JANUÁRIO,EQUIPE AMARELA,(21)97626-0256,jjanuario@id.uff.br
JEFFERSON MARINS PINTO,LIVE,(21)96409-9334,jeffersonmarins05@gmail.com
JÉSSIKA RODRIGUES REISHOFFER MUNIZ,"INTERCESSÃO,RECEPÇÃO",(21)97605-9734,reishoffer.jessika@gmail.com
JHULY ZAINOTTI MONTEIRO,FOTOGRAFIA,,jhulyzanotti6@icloud.com
JOAO PEDRO FONSECA QUIRINO,ILUMINAÇÃO,(21)98705-9443,08jpquirino@gmail.com
JOICE LAGOA DOS SANTOS COSTA,BOUTIQUE,(21)99590-2998,joicelagoa@yahoo.com.br
JOICE PEREIRA DUARTE,RECEPÇÃO,(21)99989-8215,joice duarte007@hotmail.com
JONATAS LUIZ VALADARES LEAL,ESTACIONAMENTO,(21)99725-2511,jonatas.lealengproducao@gmail.com
JORGE LUIZ DIAS LISBOA,APOIO,(21)99494-2391,jorgeldlisboa@gmail.com
JORGE RENATO CRUZ DA MATTA,SAÚDE,(21)97608-1478,renatongage@gmail.com
JOSÉ FERNANDES ROCHA,ESTACIONAMENTO,(21)99391-9474,fernandez be@hotmail.com
JOSELI SANTOS DE PAIVA,EQUIPE AZUL,(21)98801-8641,josipaiva2013@gmail.com
JOSIAS LEONARDO DIAS,RECEPÇÃO,(21)96558-7555,josiasleonardo2@gmail.com
JULIA ALVES VAZ DE AQUINO,"EQUIPE AMARELA,MUSIKIDS",(21)96826-2692,vaz.julia@gmail.com
JULIA ARANTES DE OLIVEIRA,"EQUIPE VERMELHA,RECEPÇÃO",(21)99877-7771,juliaarantesdeoliveiral2@gmail.com
JÚLIA CORDEIRO RODRIGUES,FOTOGRAFIA,(21)98933-8798,jujubacs2002@gmail.com
JULIANA DA COSTA SANTOS DE SOUZA,RECEPÇÃO,(21)96599-5175,juliana.costasantos@yahoo.com.br
JULIANA LESSA RODRIGUES,RECEPÇÃO,(21)96763-8377,lessajuliana312@gmail.com
JULIANNA PEREIRA SANT'ANNA,EQUIPE VERMELHA,(21)97206-2322,juliannasantanna.jps@gmail.com
JULIANO PORTO LAGOAS,"COORDENAÇÃO DE CULTO,ESPAÇO VIP,LIVE,SOM",(21)99856-9691,julianolagoas.ibm@gmail.com
JUSSARA DA SILVA CAMPOS,CLEANING,(21)97252-7822,jussaradasilvacampos@hotmail.com
KAREM CRISTINA LIMA GUEDES DOS REIS SILVA,RECEPÇÃO,(21)99388-9100,karenguedes97@gmail.com
KARINE BARROS DE OLIVEIRA,"ESPAÇO VIP,RECEPÇÃO",(21)99801-4529,karineocorrea@gmail.com
KAROLINE MOURA DA SILVA CABRAL,PROJEÇÃO,(21)97254-5773,karolinemoura.s@hotmail.com
KAROLYNA VITÓRIA FERREIRA NASCIMENTO,BROADCASTING,(21)99008-6063,karolynavitoria6@gmail.com
KATHELYN DINIZ SANTIAGO,CLEANING,(21)99271-4665,santiagokasantiago@gmail.com
KATIA ALMEIDA PINTO,CLEANING,(21)98559-5725,katia.almeidapinto@gmail.com
KEITI ALMEIDA ARAUJO,EQUIPE VERDE,(21)99595-5003,keitialmeidaaraujo@gmail.com
KELLY MONTEIRO SILVA NOGUEIRA,RECEPÇÃO,(21)99420-1799,kellymonts@hotmail.com
KEREN SANTOS LEMOS ABDIAS,BROADCASTING,(21)98666-9176,keh.cslemos@gmail.com
LAHIZ BORGES GUIMARÃES,RECEPÇÃO,(21)98020-0720,lahizborges@gmail.com
LANA REIS MAIA MACEDO,FOTOGRAFIA,(21)98051-6438,lanarmmacedo@gmail.com
LARISSA DE SOUZA FRANCISCO LOPES,BOUTIQUE,(21)99992-5497,larissasfbahia@gmail.com
LARISSE DA SILVA SOUZA,EQUIPE AZUL,(21)99362-6362,larissesiso@gmail.com
LEANDRO RIBEIRO NOGUEIRA,DIS,(21)96021-6404,leandrorn.bio@gmail.com
LEONAM JALOTO AGUIAR COSTA,SAUDE,(21)99978-4355,leonam.costa21@gmail.com
LEONARDO RODRIGUES DE MARINS,ESTACIONAMENTO,(21)98986-5493,leonardo07marins@gmail.com
LEONE CÉSAR DOS SANTOS,ESTACIONAMENTO,(21)96445-5356,leloliveira00@gmail.com
LETHICIA CRISTINA MEDEIROS GUIMARÃES GUTIERREZ,"SECURITY,EQUIPE AMARELA",(21)98661-0275,lethiciagutierrez01@gmail.com
LETÍCIA BLANCHE DE AMORIM DOMINGOS MIRANDA,EQUIPE AZUL,(21)97022-5580,leticiablanche@icloud.com
LETICIA DE MELO FIALHO,"ESPAÇO VIP,EQUIPE VERMELHA",(21)99468-8971,leticiamelofialho@gmail.com
LETICIA DE SOUZA CHRISTINO,EQUIPE VERMELHA,(21)98982-9043,leticiachristino21@gmail.com
LETICIA VIEIRA DE FARIAS,EQUIPE VERDE,(21)99754-2121,leticiaavfarias@gmail.com
LILIA DA SILVA FREITAS,RECEPÇÃO,(21)99437-0182,liliarochadasilva3@gmail.com
LILIAN COSTA DE ANDRADE LEAL,CLEANING,(21)96955-0959,liliannutricao@hotmail.com
LILIANNY GUIMARÃES MANFREDI,"ESPAÇO VIP,RECEPÇÃO",(21)96485-2756,lilypguimaraes@gmail.com
LILYAN DECOTHE CAMPANATTI,PROJEÇÃO,(21)96722-3022,lilyancampanatti@gmail.com
LÍVIA PEREIRA DOS SANTOS SIMÃO,BOUTIQUE,(21)99640-0156,liviapssimao@gmail.com
LIVIA REZENDE RANGEL,FOTOGRAFIA,(21)97989-9151,liviarangel0612@gmail.com
LÍVYA OLIVEIRA BARROS CORREA,EQUIPE VERMELHA,(21)99801-4521,livyaobcorrea@gmail.com
LIZANDRA DE JESUS PEREIRA,FOTOGRAFIA,(21)98469-6799,lilibruski@gmail.com
LORENA COSTA BARRETO OLIVEIRA,EQUIPE AZUL,(21)99444-0009,oliveira.anuncios123@gmail.com
LORENA DA ROCHA BAPTISTA,COFFE BREAK,(21)98846-3749,lorenarocha301@gmail.com
LORENA ROSA DA CONCEIÇÃO MONTEIRO,RECEPÇÃO,(21)98104-5743,lorenarosa72@gmail.com
LOYDE SHAYLANE MOREIRA GUEDES,CLEANING,(21)97538-3055,1smguedes@gmail.com
LUANA MEDEIROS MACIEL,SOM,(21)97974-2295,luanamedeirosdesousa@bom.com.br
LUCAS CUNHA DA SILVA,PROJEÇÃO,(21)97898-4483,1c95.abuh@gmail.com
LUCAS LUIZ CARVALHO MONTEIRO DE ANDRADE,SOM,(21)99029-8379,lucasluizcarvalho33@gmail.com
LUCAS MUNIZ DOMINGOS,ILUMINAÇÃO,(21)98562-0562,muniz.lucasmuniz03@gmail.com
LUCAS PORTO PEREIRA,EQUIPE AZUL,(21)99549-9776,lucasportop@gmail.com
LUCIA ELENA DA SILVA CAMPANATTI,CLEANING,(21)98687-5820,luciaederlon@hotmail.com
LUCIANA PECLAT GONÇALVES,RECEPÇÃO,(21)98537-2241,peclatlucianapeclat@gmail.com
LUCIANO DE PAULA FERNANDES,"APOIO,COORDENAÇÃO DE CULTO",(21)97877-8381,lucianofernandes515@gmail.com
LUIS HENRIQUE ROSA SETIMI,ESPAÇO VIP,(21)98215-3948,luisetimi@gmail.com
LUIZ FELIPE FIGUEIREDO CORREA,APOIO,(21)98851-8059,luiz.felipefc@gmail.com
LUZIMERI CRISTINA RODRIGUES FERREIRA MUNIZ,"CLEANING,INTERCESSÃO,RECEPÇÃO",(21)96482-4745,
LYZAMARA NUNES LACERDA DA CONCEIÇÃO,"EQUIPE AZUL,ESPAÇO VIP",(21)97951-7118,lyznunes@gmail.com
MARCELLO VINHAS VERÇULINO,STAFF,(21)99141-8686,marcello.vinas.40@gmail.com
MARCELO ALEXANDRE MASSOTO DA SILVA,"COORDENAÇÃO DE CULTO,ESPAÇO VIP",(21)99425-1689,marcello.massoto@gmail.com
MARCELO DANIEL DA SILVA CARNEIRO,SOM,(21)99984-3328,marcelodaniel033@gmail.com
MARCIO DA SILVA ALMEIDA,"EKLESIA,EQUIPE AZUL,ESPAÇO VIP,PROFESSORES",(21)99702-1707,madasial@gmail.com
MARCO ANTÔNIO MENDES DA SILVA,ILUMINAÇÃO,(21)97523-9150,marcomendessv@gmail.com
MARCOS ALEXANDRE DO ESPÍRITO SANTO,"ESPAÇO VIP,PROFESSORES",(21)98160-0134,marcos.santo@enel.com
MARCOS JUNIOR ASSUMPÇÃO ALBERNAZ,MUSIKIDS,(21)97202-5077,assumpmarcosmj@gmail.com
MARCUS VINICIUS BIGNON DA COSTA,APOIO,(21)98618-0228,bignondacosta@hotmail.com
MARIA AUXILIADORA ROCHA FERREIRA CALDAS,"INTERCESSÃO,STAFF",(21)98642-8801,maricaldas79@gmail.com
MARIA CLARA PRADO DE ABREU CADIMO,BISTRO,(21)99520-0434,mariaclarapradoo@hotmail.com
MARIA DA CONCEIÇÃO DA SILVA NEVES CARDOSO,BISTRO,(21)98410-4329,dedeimaria66@gmail.com
MARIA DAS GRAÇAS PEREIRA DINIZ,RECEPÇÃO,(21)96884-9797,marygracy.diniz@gmail.com
MARIA DO CARMO DA SILVA,RECEPÇÃO,(21)98756-8280,carmosilva2165@hotmail.com
MARIA EDUARDA CAMPOS ALBERTINO,"EQUIPE VERMELHA,EQUIPE AZUL",(21)98774-8106,costadasilvam724@gmail.com
MARIA EDUARDA COSTA DA SILVA,FOTOGRAFIA,(21)92006-4368,dudacampos_reserva@hotmail.com
MARIA EDUARDA LIMA DE FARIAS,FOTOGRAFIA,(21)97414-7562,mariaeduardalimadefarias5@gmail.com
MARIA EDUARDA MARINS GONÇALVES,"CLEANING,BISTRO",(21)97007-2530,madumarinsgoncalves@gmail.com
MARIA EDUARDA ROCHA NUNES,BOUTIQUE,(21)99173-0654,mariarocr21@gmail.com
MARIA REGINA PEREIRA DOS REIS EMERICK,COFFE BREAK,(21)99388-4976,mreginaemerick@gmail.com
MARIA RITA DE CASSIA CALISPTO DA SILVA,STORIES,(21)98649-7089,mariaritacalispto@gmail.com
MARIA RITA DE CÁSSIA CALISPTO DA SILVA,BOUTIQUE,(21)98649-7089,mariaritacalispto@gmail.com
MARIANGELA PINHEIRO DE CARVALHO COSTA,COFFE BREAK,(21)99693-9399,mariangelapccosta@gmail.com
MARILIA ROCHA,ILUMINAÇÃO,(21)97581-0155,mariliarfp@gmail.com
MARILZA LESSA SIQUEIRA,ESTACIONAMENTO,(21)98402-8633,marulessa@outlook.com
MARINA DE CARVALHO COSTA MOURA,PROFESSORES,(21)97150-0375,mariccosta99@gmail.com
MARLON CADIMO NÓVOA SILVA,SECURITY,(21)99165-3444,marlon.novoa@hotmail.com
MARLON JACKSON DA SILVA BAPTISTA,INTERCESSÃO,(21)97205-7054,marlon231lmoretson@hotmail.com
MATEUS GUIMARÃES SCHWARTZ FARIA,MUSIKIDS,(21)96607-7759,mateusg.schwartz@gmail.com
MATHEUS DE SOUZA CARVALHO,ESTACIONAMENTO,(21)99978-2497,ma carvalho@id.uff.br
MATHEUS LUIZ GRAÇA DA SILVA,DIS,(21)98939-7255,mtssilva2324@gmail.com
MAYANA DOS SANTOS BORGES,INTERCESSÃO,(21)97582-7149,mayanaborges2@gmail.com
MIGUEL ANGELO DO PATROCÍNIO,RECEPÇÃO,(21)98128-6344,mapatrocinio@gmail.com
MIRIAM CARRARI DE MATTOS COELHO,CLEANING,(21)98974-4954,m.carrari@gmail.com
MONICA FONSECA MARTINS,"EQUIPE AZUL,ESPAÇO VIP,RECEPÇÃO",(21)98836-2274,quirinocbmerj@gmail.com
MÔNICA LACERDA,EQUIPE VERDE,(91)98340-1848,monikalacerda21@gmail.com
MONIQUE HARDOIM DOS SANTOS LAGOAS,"BROADCASTING,RECEPÇÃO",(21)97043-1195,moniquehardoim@gmail.com
MYLENA FERREIRA MACHADO,RECEPÇÃO,(21)97267-9469,mylenaferreira0502@gmail.com
MYLLENA DA SILVA TAVARES,RECEPÇÃO,(21)98225-3546,myllena.tavaress@gmail.com
MYLLENA SANTIAGO DOS SANTOS,MUSIKIDS,(21)99828-8871,santiagomyllena@gmail.com
NATALIA BRAGA RODRIGUES,COORDENAÇÃO DE CULTO,(21)97028-8111,nataliadvogada01@gmail.com
NATHALIA LUZIA DE SOUSA SILVA CORREA,RECEPÇÃO,(21)98158-6266,nathalia.turbotruck@gmail.com
NATHAN MARTINS CARNEIRO,BISTRO,(21)96736-6940,nathan.carneiro23011@gmail.com
NEANDER MARINS GUIMARÃES,BROADCASTING,(21)96468-5630,neander92@gmail.com
NEIDE APARECIDA DA CONCEIÇÃO,BISTRO,(21)99955-2713,neydeconceicao5514@gmail.com
NEVITON FREITAS SIQUEIRA,EQUIPE VERDE,(21)98654-3408,nevitonsiqueira@yahoo.com
NICOLAS LAGOA DOS SANTOS COSTA,EQUIPE VERMELHA,(21)97134-5573,duduguittar28@gmail.com
NICOLE BARBOSA MEIRELLES DE SANT'ANNA,"EQUIPE VERDE,EKLESIA",(21)98036-3662,nicolebmeirelles@gmail.com
NICOLE SILVA BORGES,BISTRO,(21)97126-3178,nickborges06@gmail.com
PATRÍCIA DAVIS FERREIRA FREITAS MARQUES,BROADCASTING,(21)97361-3550,patriciadfreitas21@gmail.com
PATRICIA DUTRA NOGUEIRA FERREIRA,"BISTRO,EQUIPE VERDE,EQUIPE VERMELHA",(21)99328-8614,dutra269@gmail.com
PATRÍCIA LÚCIO DO VALE,RECEPÇÃO,(21)98154-5270,patriciasodre05@gmail.com
PATRYCIA ANNE GONÇALVES NUNES DE SOUZA DA SILVA,ESPAÇO VIP,(21)99161-2928,silvapattyanne@gmail.com
PAULA ALVES MIRANDA,INTERCESSÃO,(21)98208-9326,alvesmirandapaula@gmail.com
PAULA CRISTINA JESUS NUNES DE OLIVEIRA,RECEPÇÃO,(21)96803-1591,paula.nunesoliveira13@gmail.com
PAULA RAMOS DE ARAUJO DE SOUZA,CLEANING,(21)98745-5032,paulaaraujosouza7@gmail.com
PAULO CEZAR AROUCA BALTHAR,EQUIPE VERMELHA,(21)97976-4499,paulocezarrr97@gmail.com
PAULO ROBERTO SANTOS DE SOUZA,CLEANING,(21)98454-2165,paulloroberto87@gmail.com
PEDRO HENRIQUE SOUSA DO COUTO,MUSIKIDS,(21)98229-0443,phsousacouto@gmail.com
PEDRO PAULO BRAGA MARINS MIRANDA,CLEANING,(21)99577-2031,p.marins@hotmail.com
PETER DE SOUZA BORGES,APOIO,(21)97034-3054,petersouzaborges@hotmail.com
PR. HUGO CAMPOS DE SOUZA,ILUMINAÇÃO,(21)99524-7838,hugocamposdesouza@hotmail.com
PRISCYLLA VITORIA OLIVEIRA DE MORAES DO NASCIMENTO,ESTACIONAMENTO,(21)99199-5547,vitoria_pri@hotmail.com
QUEILA DE MELLO GAUTER,BISTRO,(21)99780-4063,queilagaute@gmail.com
RAFFAEL DA SILVA RAINHA,PROFESSORES,(21)99324-4404,raffaelrainha@gmail.com
RAIANI DE AZEREDO CASSILHA,"STORIES,SAÚDE",(21)98601-4349,raianiazeredo@gmail.com
RAILTON SERGIO DE OLIVEIRA FERREIRA,RECEPÇÃO,(21)99322-6754,railtonsergioof@gmail.com
RAMON ABDIAS,EQUIPE AZUL,(21)98288-1930,ramon.abdias@gmail.com
RAMON DA COSTA RODRIGUES,MUSIKIDS,(21)98698-9041,ramon.rodrigues1467@gmail.com
RAMON PATRIC DE AZEVEDO SILVA,INTERCESSÃO,(21)96531-3426,rapatric98@gmail.com
RAPHAEL DA SILVA ROZA,"SOM,ILUMINAÇÃO",(21)99450-6143,raphaelzroza@gmail.com
RAPHAEL FERNANDO GOULART DA SILVA,PROJEÇÃO,(21)97575-9386,ralphgoulart@outlook.com
RAQUEL BOURQUARD CORREIA,"MUSIKIDS,SOM",(21)98582-1688,rbourquard@id.uff.br
RAQUEL GOMES DE AGUIAR,STAFF,(21)97013-9233,raquelgomes.2016.vitor@gmail.com
RAQUEL GOMES VC DUARTE,DIS,(21)97449-0006,raquelgomesduarte@gmail.com
RAQUEL RIBEIRO GONCALVES,ESPAÇO VIP,(21)96549-5744,raquel.ribeiro93@yahoo.com
RAQUEL SOUSA DO ESPÍRITO SANTO,PROJEÇÃO,(21)96921-7260,raquelsousa4r@icloud.com
REGIA MARIA HOLANDA OLIVEIRA,PROJEÇÃO,(21)96861-9586,regia oliveira@hotmail.com
REGINA CELIA EVANGELISTA NOGUEIRA DA SILVA,EQUIPE VERDE,(21)96472-8132,alinepedrogiovani@hotmail.com
REGINA DE OLIVEIRA SOUZA DA SILVA,RECEPÇÃO,(21)98886-9796,reginasouzasilva@hotmail.com
REJANE VIEIRA DE FARIAS,RECEPÇÃO,(21)99754-9905,rejane.v.farias@gmail.com
REGINALDO GOMES PINHEIRO,BISTRO,(21)98656-2038,reginaldogp46@gmail.com
RENAN DE CARVALHO COSTA,APOIO,(21)97217-1582,renancarvalhoc06@gmail.com
RENANN FERNANDES FIALHO,"EQUIPE VERDE,STAFF",(21)97032-0547,renannfialho@icloud.com
RITA DE CASSIA RIBEIRO DOS SANTOS,ESPAÇO VIP,(21)99132-4778,ritafgsantos346@gmail.com
RODRIGO DE OLIVEIRA MOREIRA RODRIGUES,RECEPÇÃO,(21) 99902-8355,rodrigobina22@gmail.com
RODRIGO DUARTE PINTO GOMES,RECEPÇÃO,(21)98766-5007,rodrigojnsse@gmail.com
ROGÉRIO RIBEIRO FERNANDES,BROADCASTING,(21)98530-5547,rogeresmo78@gmail.com
RONALD TORRES CABRAL,RECEPÇÃO,(21)98367-8570,ronaldcabral95@gmail.com
ROSANE SIQUEIRA DE SOUZA,COORDENAÇÃO DE CULTO,(21)97863-0007,rosaneelaura10@gmail.com
ROSIANE MOTTA DA SILVA E SILVA,"STAFF,BISTRO,COFFE BREAK",(21)96762-6766,rosianemottadr@gmail.com
ROWENNA E SILVA COUBELLE DE SOUZA,ESPAÇO VIP,(21)98622-0472,rowenna_coubelle@hotmail.com
RUAN CARLOS TRUGILHO CANDIDO,RECEPÇÃO,(21)98267-3910,pastorruantrugilho@gmail.com
RULIAN NASCIMENTO MONTEIRO,EQUIPE AMARELA,(21)99586-6893,rulinascimento@hotmail.com
SALVADOR MOURA LUIZ,ESTACIONAMENTO,(21)96674-1141,smluiz52@gmail.com
SAMUEL NICOLAS PAVÃO VIANA DA SILVA,"STAFF,APOIO",(21)98212-7087,samuel.nicolasr7@gmail.com
SANDRA REGINA BARBOSA TAVARES MASSOTO,BROADCASTING,(21)98849-0333,sandra.massoto@gmail.com
SANDRIELE NEVES CARRARO COSTA,STAFF,(21)96565-6795,sandynevescarraro@gmail.com
SARA BEATRIZ ROCHA DE QUEIROZ,RECEPÇÃO,(21)98614-0797,sarabeabeatriz.sb@gmail.com
SARA MACHADO DOS SANTOS,EQUIPE AZUL,(21)98082-2038,saramsantosprincesa@gmail.com
SARAH GONÇALVES MARTINS,FOTOGRAFIA,(21)98673-2616,sarahppgon@gmail.com
SARAH PEREIRA FREITAS,PROJEÇÃO,(21)99555-8684,savinhamsantos@gmail.com
SAVIA MACHADO SOARES DOS SANTOS,FOTOGRAFIA,(21)96403-9556,selmaignaciosena@gmail.com
SELMA IGNACIO CASTILHO SENA,EQUIPE VERDE,(21)99196-7132,sricardocouto@yahoo.com.br
SERGIO RICARDO COUTO FILHO,"RECEPÇÃO,LIVE",(21)99196-7132,sricardocouto@yahoo.com.br
SERGIO ROBERTO BARCELLOS DA COSTA FILHO,SOM,(21)97502-1046,sergiobarcellos.filho@gmail.com
SHARLONY GOMES CABRAL DO NASCIMENTO,MUSIKIDS,(21)99558-4912,sharlony.gon@gmail.com
SHEILA CRISTINA FERMIANO MONTEIRO PINHEIRO,BOUTIQUE,(21)98836-9883,boutiquedabeleza44@gmail.com
SIMONE ANTUNES FERNANDES DE SOUZA,EQUIPE AZUL,(21)98484-6991,simoneantunes.fs@gmail.com
SIMONE DOS SANTOS SILVA BORGES,RECEPÇÃO,(21)99755-4159,syssyborgesl@gmail.com
SÔNIA MARIA DE OLIVEIRA MONTEIRO,"BOUTIQUE,BISTRO",(21)98659-1264,semmonteiro@hotmail.com
SOPHIA ZAINOTTI MONTEIRO,EQUIPE AMARELA,(21)97558-4604,sosozainottii@icloud.com
SUELI SOLANGE FERREIRA VILLAÇA,EQUIPE AZUL,(21)96990-9309,suelisfvillaca@gmail.com
SUELLEN CALISPTO MONTEIRO DA SILVA,FOTOGRAFIA,(21)97368-4801,suellencalispto@yahoo.com.br
SUELLEN LEAL DO ESPÍRITO SANTO,CLEANING,(21)96992-1209,susu.leal@hotmail.com
SUELY COSTA FONSECA,RECEPÇÃO,(21)98698-9410,suelycosta452@gmail.com
SUSANE BATISTA ALVES THURLER,EQUIPE VERDE,(21)98928-4264,susithurler@gmail.com
SYLAS VIEIRA BUENO,CLEANING,(21)97656-0493,sylasvieirab@gmail.com
TAIS SANTOS MORETSON BAPTISTA,RECEPÇÃO,(21)99514-0096,taismoretson@hotmail.com
TAMIRES NASCIMENTO DA SILVA,MUSIKIDS,(21)98253-3871,tamiresnascimentodasilva29@gmail.com
TAMIRIS LIMA FIDELIS,EQUIPE AMARELA,(21)99114-1996,tamirislimafidelis@gmail.com
TAYANE DOS SANTOS TEIXEIRA FONSECA,"BOUTIQUE,COFFE BREAK",(21)99521-9152,tayanedsteixeira@gmail.com
TAYS SANTOS TAMANDARE,BOUTIQUE,(21)99709-1510,tays.tamandare04@yahoo.com.br
THAISSA MAIA PINTO DE ABREU,EQUIPE AZUL,(21)98819-4722,thaissamaia23@gmail.com
THALLYSON FILIPE DE MOURA BATISTA,"EQUIPE VERDE,RECEPÇÃO,ESPAÇO VIP",(21)97995-5247,thallysonfilipemoura@gmail.com
THATIANA ALMEIDA MACIEL,RECEPÇÃO,(21)99336-5017,
THAYS BATISTA NASCIMENTO,SOM,(21)98705-4845,thaysbatistanascimento658@gmail.com
THERESA TEMPERINI SOUZA,CLEANING,(21)98679-6303,tttemperini@gmail.com
THIAGO LOPES DA SILVA,CLEANING,(21)99159-1272,lthiago1986@gmail.com
THIAGO DIAS DE SOUZA MOURA,"MUSIKIDS,COORDENAÇÃO DE CULTO,EKLESIA,EQUIPE VERMELHA,PROFESSORES",(21)98900-1302,thiago-ddsm@hotmail.com
THIAGO GRASSINI DE SOUZA,,(21)97045-7947,thiagograssini2013@gmail.com
THIAGO PEREIRA DA SILVA CHAVES,SOM,(21)99896-6829,thiagoperreira9@gmail.com
THUAN DE LIMA SILVA,MUSIKIDS,(21)98274-9759,thuanlima3@gmail.com
THUANE BARBOSA LOPES,STORIES,(21)97604-9302,thuane.bbs03@gmail.com
UESLEI MENDONÇA RODRIGUES,"RECEPÇÃO,BROADCASTING,APOIO",,
VANESSA OLIVEIRA LOPES,APOIO,(21)98612-7801,vanessalopesrj@hotmail.com
VANESSA ARAÚJO TEIXEIRA TAVARES,EQUIPE VERMELHA,(21)99436-3458,arateixa@gmail.com
VANESSA MESQUITA RANGEL,"INTERCESSÃO,RECEPÇÃO",(21)97888-3711,vanessammesquita8@gmail.com
VANESSA PEREIRA RANGEL RAMOS,EQUIPE VERMELHA,(21)99486-8551,rdsramos1@hotmail.com
VANESSA REIS FIGUEIRA,"CLEANING,INTERCESSÃO",(21)97739-3043,vanessarfigueira@gmail.com
VÂNIA LÉA SANTOS DIAS,CLEANING,(21)97747-2852,vanialea343@gmail.com
VERONICA DE OLIVEIRA FIRMINO DE SOUZA,RECEPÇÃO,(21)98705-3604,veronicaoliveira2003@gmail.com
VICTOR CASTRO BARROZO,EQUIPE VERDE,(21)98570-9715,castrosan94@gmail.com
VICTORIA DA SILVA SOUZA DE SÁ,MUSIKIDS,(21)97039-5095,
VILMA GOMES TRINDADE,BISTRO,(21)97321-6708,gomesvilma444@gmail.com
VITÓRIA MOTTA DA SILVA,EQUIPE AMARELA,(21)99645-0221,vmottadasilvaa@gmail.com
VITÓRIA TAVARES DA COSTA,BROADCASTING,(21)96696-2485,vitoriatavaresc16@gmail.com
WELSON PINHEIRO,,(21)99448-4720,ti co34@hotmail.com
WILSON MICHAEL GOUDARD MONTEIRO,APOIO,(21)98581-3881,michaelgoudard@outlook.com
YASMIM CALAZANS PEREIRA DE QUEIROZ,STAFF,(21)97751-1689,ycalazanspereira@gmail.com
YASMIM SANT'ANNA LIMA,RECEPÇÃO,(21)98445-1779,yasmimsantanna64@gmail.com
YOLANDA NICOLE DE OLIVEIRA SOUZA,"ESPAÇO VIP,EQUIPE AZUL",(21)99686-7388,nicoleesouzaal@gmail.com`;

function parseAndStructureData(csv: string): VolunteerToImport[] {
    const teamMapping: { [key: string]: string } = {
        'EQUIPE AMARELA': 'Amarela',
        'EQUIPE AZUL': 'Azul',
        'EQUIPE VERDE': 'Verde',
        'EQUIPE VERMELHA': 'Vermelha'
    };

    const lines = csv.trim().split('\n').slice(1);
    const structuredData: { [name: string]: VolunteerToImport } = {};

    lines.forEach(line => {
        // Handle commas within quoted fields
        const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => col.replace(/"/g, '').trim());
        const [name, ministry, phone, email] = columns;

        if (!name) return;

        let team: string | null = null;
        const areas = (ministry || '')
            .split(',')
            .map(m => m.trim().toUpperCase())
            .filter(m => {
                if (teamMapping[m]) {
                    team = teamMapping[m];
                    return false; // This is a team, not an area
                }
                return m.length > 0; // This is an area
            });
            
        const formattedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        if (structuredData[formattedName]) {
            // Merge areas if volunteer already exists
            structuredData[formattedName].areas = [...new Set([...structuredData[formattedName].areas, ...areas])];
            if (team && !structuredData[formattedName].team) {
                 structuredData[formattedName].team = team;
            }
        } else {
            // Create new entry
            structuredData[formattedName] = {
                name: formattedName,
                team: team,
                areas: areas,
                phone: phone || '',
                email: email || '',
                availability: [] // Default availability
            };
        }
    });
    
    // Assign default team if none found
    Object.values(structuredData).forEach(volunteer => {
        if (!volunteer.team) {
            volunteer.team = 'N/A';
        }
    });

    return Object.values(structuredData);
}

const volunteersToImport = parseAndStructureData(csvData);

export default function ImportPage() {
    const { addVolunteer, volunteers } = useAppData();
    const { toast } = useToast();
    const [isImporting, startImportTransition] = useTransition();
    const [progress, setProgress] = useState(0);
    const [importLog, setImportLog] = useState<string[]>([]);

    const handleImport = () => {
        startImportTransition(async () => {
            const volunteersCollection = collection(db, 'volunteers');
            const batch = writeBatch(db);
            let importedCount = 0;
            let skippedCount = 0;
            
            setImportLog(['Iniciando importação...']);

            for (let i = 0; i < volunteersToImport.length; i++) {
                const volunteerData = volunteersToImport[i];
                
                // Check if volunteer already exists by name
                const q = query(volunteersCollection, where("name", "==", volunteerData.name));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    const volunteerDocRef = doc(volunteersCollection);
                    batch.set(volunteerDocRef, volunteerData);
                    importedCount++;
                    setImportLog(prev => [...prev, `[CRIADO] ${volunteerData.name}`]);
                } else {
                    skippedCount++;
                    setImportLog(prev => [...prev, `[IGNORADO] ${volunteerData.name} (já existe)`]);
                }

                setProgress(((i + 1) / volunteersToImport.length) * 100);

                // Commit batch every 500 writes
                if ((i + 1) % 500 === 0) {
                    await batch.commit();
                    // Re-initialize batch after commit
                    // batch = writeBatch(db); 
                    // this line is commented as it's not available on the user-provided context
                }
            }

            // Commit any remaining writes
            await batch.commit();

            toast({
                title: 'Importação Concluída!',
                description: `${importedCount} voluntários cadastrados, ${skippedCount} ignorados.`,
                className: "bg-primary text-primary-foreground",
            });
             setImportLog(prev => [...prev, `\nConcluído! ${importedCount} voluntários cadastrados, ${skippedCount} ignorados.`]);
        });
    };
    
    const showImportButton = volunteers.length < volunteersToImport.length;

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Importar Voluntários</CardTitle>
                    <CardDescription>
                       Clique no botão para cadastrar em massa a lista de voluntários no banco de dados.
                       Voluntários com o mesmo nome não serão duplicados.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-start gap-4">
                     <Button onClick={handleImport} disabled={isImporting || !showImportButton} variant="default" size="lg">
                        {isImporting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <UploadCloud className="mr-2 h-4 w-4" />
                        )}
                        Importar {volunteersToImport.length} Voluntários
                      </Button>
                      {!showImportButton && !isImporting && (
                        <p className="text-sm text-green-600 font-medium">Todos os voluntários já foram importados.</p>
                      )}
                      {isImporting && (
                        <div className="w-full">
                           <Progress value={progress} className="w-full" />
                           <p className="text-sm text-muted-foreground mt-2 text-center">{Math.round(progress)}%</p>
                        </div>
                      )}
                </CardContent>
            </Card>

            {importLog.length > 1 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Log de Importação</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted text-muted-foreground p-4 rounded-md h-96 overflow-y-auto text-xs">
                            {importLog.join('\n')}
                        </pre>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}