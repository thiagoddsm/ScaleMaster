"use client"

import React, { useState, useTransition } from 'react';
import { PlusCircle, MoreHorizontal, Edit, Trash2, Search, UploadCloud, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import type { Volunteer } from '@/lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useAppData } from '@/context/AppDataContext';
import { Skeleton } from '@/components/ui/skeleton';

// --- TEMPORARY DATA FOR IMPORT ---
const volunteersToImport: Omit<Volunteer, 'id'>[] = [
    { name: 'ADALGIZA PEREIRA DE LIRA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98954-2700', email: '' },
    { name: 'ADRIANA DA SILVA SOUZA DE SA', team: 'N/A', areas: ['INTERCESSÃO'], availability: [], phone: '(21)96448-5279', email: 'adrianadesa81@gmail.com' },
    { name: 'ADRIANA MARTINS DOS SANTOS ALMEIDA', team: 'N/A', areas: ['DIS'], availability: [], phone: '(21)98813-0936', email: 'amsa5677@gmail.com' },
    { name: 'ADRIANO ALCANTARA RIBEIRO', team: 'N/A', areas: ['PROFESSORES', 'STAFF'], availability: [], phone: '(21)98564-3030', email: 'adrianoalcantararibeiro@gmail.com' },
    { name: 'ADRYELY SIMONARD SANTOS SILVA', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)96554-1299', email: 'adryelysimonard20@gmail.com' },
    { name: 'ALESSANDRO DE CASTRO CAMPOS', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)96467-2779', email: 'alecampos0709@gmail.com' },
    { name: 'ALESSANDRO DE SOUZA SILVA', team: 'N/A', areas: ['ILUMINAÇÃO'], availability: [], phone: '(21)99162-2979', email: 'alessandroitilbr@hotmail.com' },
    { name: 'ALEX DA SILVA CALDAS', team: 'N/A', areas: ['STAFF'], availability: [], phone: '(21)98769-7374', email: 'ascaldas.silva@gmail.com' },
    { name: 'ALEX LEONI SANTOS DE PAIVA', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)98585-7696', email: 'alexleonisp23@gmail.com' },
    { name: 'ALEX LOURENÇO MADUREIRA', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)99151-8935', email: 'alex.madureira@outlook.com' },
    { name: 'AMANDA ASSUMPÇÃO ALBERNAZ', team: 'VERMELHA', areas: [], availability: [], phone: '(21)98865-7710', email: 'soparaconcursos10@gmail.com' },
    { name: 'AMANDA MELYSSA FREIRE PINTO', team: 'VERMELHA', areas: [], availability: [], phone: '(21)96688-5110', email: 'amandinhamelyssa@gmail.com' },
    { name: 'ANA BEATRIZ FERNANDES DE SOUZA', team: 'AZUL', areas: [], availability: [], phone: '(21)99966-6129', email: 'anabeatrizfdesouza@gmail.com' },
    { name: 'ANA BEATRIZ OLIVEIRA LOPES BRAGA', team: 'VERDE', areas: [], availability: [], phone: '(21)98988-1954', email: 'bragaanabeatriz43@gmail.com' },
    { name: 'ANA CARLINDA CAMPOS DE SOUZA', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)99626-9005', email: 'anacarlindacamposde souza@hotmail.com' },
    { name: 'ANA CAROLINA JANUÁRIO ALVES', team: 'AZUL', areas: [], availability: [], phone: '(21)96806-5661', email: 'anacbjanuario@gmail.com' },
    { name: 'ANA CAROLLINE GOMES DE OLIVEIRA NASCIMENTO', team: 'AMARELA', areas: ['DIS'], availability: [], phone: '(21)99430-0547', email: 'carol.olvnascimento@gmail.com' },
    { name: 'ANA CLAUDIA FERREIRA AMARAL FEITOSA', team: 'AMARELA', areas: ['ESPAÇO VIP'], availability: [], phone: '(21)98688-2786', email: 'ana.feitosa.claudia@outlook.com' },
    { name: 'ANA CLAUDIA LÁZARO DE SOUZA VERAS', team: 'VERMELHA', areas: [], availability: [], phone: '(21)96418-8743', email: 'anaclaudia.lazzaro@gmail.com' },
    { name: 'ANA CRISTINA LEAL DOS SANTOS TEIXEIRA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99966-5813', email: 'anacris.leal2@gmail.com' },
    { name: 'ANA ELISA BARBOSA TRINDADE', team: 'N/A', areas: ['BOUTIQUE'], availability: [], phone: '(21)98109-6830', email: 'anaelisatrin@gmail.com' },
    { name: 'ANA ELÍSIA FERREIRA DA SILVA', team: 'VERMELHA', areas: ['RECEPÇÃO'], availability: [], phone: '(21)95904-5149', email: 'aelisiaf@gmail.com' },
    { name: 'ANA JÚLIA PONTES DA SILVA RIBEIRO', team: 'AMARELA', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99764-3990', email: 'anajulia200264@hotmail.com' },
    { name: 'ANA KAROLINE LUCAS DUARTE', team: 'VERMELHA', areas: [], availability: [], phone: '(21)99850-1700', email: 'anaklucas19@gmail.com' },
    { name: 'ANA LÚCIA FERNANDES DE CARVALHO BALTHAR', team: 'AMARELA', areas: [], availability: [], phone: '(21)97748-7337', email: 'kx11243@gmail.com' },
    { name: 'ANA LÚCIA LEMOS FERREIRA', team: 'N/A', areas: ['COFFE BREAK'], availability: [], phone: '(21)97473-1872', email: 'lemosanalucial16@gmail.com' },
    { name: 'ANDERSON DOS SANTOS BATISTA', team: 'N/A', areas: ['INTERCESSÃO'], availability: [], phone: '(21)97004-6708', email: 'andersonbaptista26@hotmail.com' },
    { name: 'ANDERSON FELIPE CAMINHA', team: 'N/A', areas: ['SOM'], availability: [], phone: '(21)98500-5129', email: 'acaminha31@gmail.com' },
    { name: 'ANDERSON RIBEIRO DA SILVA', team: 'N/A', areas: ['STAFF'], availability: [], phone: '(21)99472-2481', email: 'ars231075@gmail.com' },
    { name: 'ANDRÉ FELIPE DA SILVA', team: 'N/A', areas: ['BISTRO', 'COORDENAÇÃO DE CULTO', 'ESPAÇO VIP'], availability: [], phone: '(21)98235-8612', email: 'andrefelipe311713@gmail.com' },
    { name: 'ANDRE LEONI SANTOS DE PAIVA', team: 'N/A', areas: ['ILUMINAÇÃO'], availability: [], phone: '(21)98739-6763', email: 'dedeleonipaiva@gmail.com' },
    { name: 'ANDREA BARBOSA PEREIRA MEIRELLES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)97644-4906', email: 'andreameirelllles@gmail.com' },
    { name: 'ANDREA CHRISTIANE CAVALCANTI DE GOES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)96449-2328', email: 'andreagoes30@gmail.com' },
    { name: 'ANDRESSA SILVEIRA DA CRUZ ROZA', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)96815-5025', email: 'andressacruz29@gmail.com' },
    { name: 'ANDREZA DUARTE COSTA', team: 'AZUL', areas: [], availability: [], phone: '(21)96624-7595', email: 'andrezaduarte77@gmail.com' },
    { name: 'ANNA CLARA COUTINHO DA SILVA', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)97190-1778', email: 'claracout1409@gmail.com' },
    { name: 'ARISLÉDIO FERREIRA DA SILVA', team: 'N/A', areas: ['APOIO'], availability: [], phone: '(21)98104-1093', email: 'leo.f.silva48@gmail.com' },
    { name: 'ARTHUR MESQUITA DA CRUZ', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)99632-8734', email: 'artmecruz@gmail.com' },
    { name: 'ARTHUR VICTOR DE OLIVEIRA SILVA', team: 'N/A', areas: ['SOM'], availability: [], phone: '(21)99431-1438', email: 'victorroot20@gmail.com' },
    { name: 'ASAFE FERREIRA DE MELLO', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)96430-8825', email: 'asafe mello@hotmail.com' },
    { name: 'BEATRIZ ABREU DOS SANTOS', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99505-8279', email: 'abreubiasantos@gmail.com' },
    { name: 'BEATRIZ ALMEIDA CUNHA BELLOT DE SOUZA', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)99515-9274', email: 'bebellot13@gmail.com' },
    { name: 'BEATRIZ RODRIGUES MANHÃES MARINS', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)97172-7635', email: 'beatrizmarins035@gmail.com' },
    { name: 'BEATRIZ SOUZA DA SILVA', team: 'AZUL', areas: [], availability: [], phone: '(21)98525-8249', email: 'bt240596@gmail.com' },
    { name: 'BERNARDO LEITE LESSA CAETANO', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)99031-9817', email: 'bernardollcaetano007@gmail.com' },
    { name: 'BIANCA CALISPTO MONTEIRO DA SILVA', team: 'AZUL', areas: [], availability: [], phone: '(21)99854-8562', email: 'biacalispto@hotmail.com' },
    { name: 'BIANCA MONTEIRO BACELAR LOPES', team: 'N/A', areas: ['BOUTIQUE'], availability: [], phone: '(21)99269-1807', email: 'biancamblopes@gmail.com' },
    { name: 'BRENO MAYRINK NASCIMENTO GUEDES', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)97011-5422', email: 'brenomayrinkn@gmail.com' },
    { name: 'BRUNA CAMACHO LONGOBUCO', team: 'AMARELA', areas: [], availability: [], phone: '(21)99489-6964', email: 'bclongobuco@gmail.com' },
    { name: 'BRUNA DIAS DE SANT\'ANNA CORREA', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)99334-0114', email: 'brunacorrea406@gmail.com' },
    { name: 'BRUNA DO NASCIMENTO RIBEIRO', team: 'N/A', areas: ['STORIES'], availability: [], phone: '(21)98472-4096', email: 'inf.brunaribeiro@gmail.com' },
    { name: 'BRYAN DE CARVALHO SANTORO', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)92019-3895', email: 'bryansanttoro@gmail.com' },
    { name: 'CAMILLE DIAS QUARESMA', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)96957-4709', email: 'camilledias8@gmail.com' },
    { name: 'CARLA DA SILVA BERRIEL BATISTA', team: 'N/A', areas: ['INTERCESSÃO'], availability: [], phone: '(21)96489-0808', email: 'cbb.berriel@gmail.com' },
    { name: 'CARLOS ANTÔNIO MENDONÇA BORGES JUNIOR', team: 'N/A', areas: ['ESTACIONAMENTO', 'RECEPÇÃO'], availability: [], phone: '(21)97508-8386', email: 'carlosjunior.cj536@gmail.com' },
    { name: 'CARLOS FABRÍCIO LOBO THURLER', team: 'N/A', areas: ['APOIO'], availability: [], phone: '(21)98647-4211', email: 'fabriciothurler@gmail.com' },
    { name: 'CARLOS HENRIQUE LIMA GUEDES', team: 'N/A', areas: ['ESPAÇO VIP', 'ESTACIONAMENTO'], availability: [], phone: '(21)98540-2263', email: 'chlguedes@hotmail.com' },
    { name: 'CARLOS MAGNO PACHECO DOS SANTOS', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)99967-7437', email: 'magnopacheco47@gmail.com' },
    { name: 'CAROLAINE SANTOS MORETSON COUTINHO', team: 'AMARELA', areas: [], availability: [], phone: '(21)96778-7549', email: 'moretsoncarol@gmail.com' },
    { name: 'CAROLINA FARIA GONÇALVES TRUGILHO', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)98139-8761', email: 'carolinafaria.adv@gmail.com' },
    { name: 'CAROLINE NOGUEIRA DA SILVA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(22)96444-0087', email: 'cns.nogueira87@gmail.com' },
    { name: 'CÁSSIO LUIZ MARQUES WELBERT', team: 'N/A', areas: ['ILUMINAÇÃO'], availability: [], phone: '(21)99945-1256', email: 'potassio.cm@gmail.com' },
    { name: 'CINTHIA REIS ALENTEJO', team: 'VERMELHA', areas: [], availability: [], phone: '(21)98821-9478', email: 'cinthiaalentejo@hotmail.com' },
    { name: 'CINTIA ALMEIDA ABREU', team: 'VERDE', areas: [], availability: [], phone: '(21)98865-8805', email: 'cintiaalmeida@myyahoo.com' },
    { name: 'CINTIA GOMES DE SOUZA SOARES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)97285-9913', email: 'cintia.gsoares09@gmail.com' },
    { name: 'CINTIA MENDES MACEDO RODRIGUES', team: 'AMARELA', areas: [], availability: [], phone: '(21)97449-2776', email: 'cintia.psicopedagoga75@gmail.com' },
    { name: 'CÍNTIA DOS ANJOS MOURA AMORIM', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '', email: 'cintiaanjos.amorim@hotmail.com' },
    { name: 'CLARA VICTOR FIUZA MOREIRA LIMA', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)97604-3849', email: 'clarafiuzal@gmail.com' },
    { name: 'CLAUDIA REGINA DE CARVALHO MONTEIRO BACELAR', team: 'AMARELA', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98985-9412', email: 'claudiamonteirobacelar@gmail.com' },
    { name: 'CLAUDIO DA SILVA JUNIOR', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)98041-6241', email: 'claudio.eng.jr@gmail.com' },
    { name: 'CLAUDIO RENATO VEIGA RABELLO', team: 'N/A', areas: ['INTERCESSÃO', 'RECEPÇÃO'], availability: [], phone: '(21)96989-1357', email: 'claurabello22@gmail.com' },
    { name: 'CLAUDIO ROGERIO INACIO DE FARIAS', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)98113-3648', email: 'claudio.i.farias@gmail.com' },
    { name: 'CLEIDE FERREIRA DA COSTA MONTEIRO', team: 'N/A', areas: ['APOIO'], availability: [], phone: '(21)98479-2451', email: '' },
    { name: 'CLINTON TAVARES BARRETO', team: 'N/A', areas: ['SECURITY'], availability: [], phone: '(21)97036-8150', email: 'clinton.tecnocon@gmail.com' },
    { name: 'CYNTIA HAASE PUPO', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)99592-6236', email: 'cyntia haase@hotmail.com' },
    { name: 'DANIEL PEREIRA SOTA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)97582-7076', email: 'dpereirasota@gmail.com' },
    { name: 'DANIEL SILVA DOS SANTOS', team: 'N/A', areas: ['SOM', 'SAÚDE'], availability: [], phone: '(21)99722-2739', email: 'dsds.danielsilvadossantos@gmail.com' },
    { name: 'DANIEL VELOSO LOPES', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)99470-5758', email: 'danielvelosolopes@hotmail.com' },
    { name: 'DANIELE DA SILVA PEREIRA SOTA', team: 'N/A', areas: ['COORDENAÇÃO DE CULTO'], availability: [], phone: '(21)99250-0763', email: 'daniellecasal@gmail.com' },
    { name: 'DANIELLE NUNES SANTOS', team: 'VERDE', areas: [], availability: [], phone: '(21)97208-9233', email: 'daniellenu85@gmail.com' },
    { name: 'DAVI NOGUEIRA FERREIRA', team: 'N/A', areas: ['SOM'], availability: [], phone: '(21)99874-5767', email: 'davinog0409@gmail.com' },
    { name: 'DAVI PEREIRA SOTA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)97698-8283', email: '' },
    { name: 'DAVID OLIVEIRA DE MORAES', team: 'N/A', areas: ['BOUTIQUE'], availability: [], phone: '(21)97385-8704', email: 'davidmoraes7210@gmail.com' },
    { name: 'DAYSE LUCY DA SILVA SOUZA', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21) 99900-0112', email: 'dayselsouza@yahoo.com.br' },
    { name: 'DELCIR VIEIRA DOMINGOS', team: 'N/A', areas: ['BROADCASTING', 'STORIES'], availability: [], phone: '(21)98818-7537', email: 'delcir.domingos@gmail.com' },
    { name: 'DEUSILEA COSTA', team: 'N/A', areas: ['COFFE BREAK'], availability: [], phone: '(21)99626-6799', email: 'deusileacosta2015@gmail.com' },
    { name: 'DEYVSON MACIEL CAETANO', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)98299-0572', email: 'deyvsonmaciel@yahoo.com.br' },
    { name: 'DHEMERSON GOMES MARINS', team: 'AMARELA', areas: [], availability: [], phone: '(21)98678-8956', email: 'dhemersongm@gmail.com' },
    { name: 'DOUGLAS DOS SANTOS DA CONCEIÇÃO', team: 'N/A', areas: ['VIP', 'BISTRO'], availability: [], phone: '(21)98097-9351', email: 'douglas.da.conceicao@hotmail.com' },
    { name: 'ÉDERLON DA SILVA CAMPANATTI', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)98939-5820', email: 'ederloncampanatti@hotmail.com' },
    { name: 'EDERLON DA SILVA CAMPANATTI', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)98939-5820', email: 'ederloncampanatti@hotmail.com' },
    { name: 'EDILMA DA SILVA TOMAZ', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)98156-7344', email: 'edilmatomaz14@gmail.com' },
    { name: 'EDNA DA SILVA TEIXEIRA', team: 'AZUL', areas: [], availability: [], phone: '(22)98852-3117', email: 'ednasteixeiraa@gmail.com' },
    { name: 'EDUARDA ARRAIS BARBOSA', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)96763-5641', email: 'eduardaarraisjobs@gmail.com' },
    { name: 'EDUARDO DOS SANTOS COSTA', team: 'N/A', areas: ['ILUMINAÇÃO'], availability: [], phone: '(21)99894-2998', email: 'duduguitar@yahoo.com.br' },
    { name: 'ELAINE PEREIRA DA SILVA MADUREIRA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99255-8165', email: 'nannyalegria2012@gmail.com' },
    { name: 'ELIAKIM PEREIRA DA SILVA', team: 'VERMELHA', areas: [], availability: [], phone: '(21)99159-7038', email: 'eliakimsilva@gmail.com' },
    { name: 'ELIAS FERNANDES DOS SANTOS FREITAS', team: 'VERMELHA', areas: ['BROADCASTING'], availability: [], phone: '(21)96660-3361', email: 'efreitasdg@gmail.com' },
    { name: 'ELIEZER DA SILVA ALMEIDA', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)96977-2042', email: 'eliezer.almeida@crf-rj.org.br' },
    { name: 'ELISA ALVES THURLER', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98928-4262', email: 'elisathurler@gmail.com' },
    { name: 'ELISA OLIVEIRA DA SILVA', team: 'VERMELHA', areas: [], availability: [], phone: '(21)97587-7403', email: 'almeida.o.elisa@gmail.com' },
    { name: 'ELISANGELA PAES CAMPOS', team: 'VERDE', areas: [], availability: [], phone: '(21)98020-9483', email: 'elisangela.paes0709@gmail.com' },
    { name: 'ELIZANGELA BRUSKI DE JESUS', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98775-2282', email: 'corujinha25@gmail.com' },
    { name: 'ELIZETE AZEVEDO DA SILVA MARTINS', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)97179-8359', email: 'elizete.dayfels@gmail.com' },
    { name: 'ELOISA SILVA BATISTA', team: 'AZUL', areas: [], availability: [], phone: '', email: 'eloisasiilva47@gmail.com' },
    { name: 'EMMANOEL DA SILVA ABREU', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)99253-7000', email: 'emmanoel2015@gmail.com' },
    { name: 'ERICK DA COSTA MONTEIRO', team: 'VERMELHA', areas: ['CLEANING'], availability: [], phone: '(21) 99909-0607', email: 'erickcostamonteiro@gmail.com' },
    { name: 'ERIKA SANTOS COUTO RAINHA', team: 'VERDE', areas: [], availability: [], phone: '(21)99351-4706', email: 'erika andrade50@yahoo.com.br' },
    { name: 'ESTEPHANY DE OLIVEIRA MONTEIRO', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99025-6833', email: 'estephanyo16@gmail.com' },
    { name: 'ESTHER ALVES DA SILVA', team: 'AMARELA', areas: [], availability: [], phone: '(21)97539-8012', email: 'alvesesther04@gmail.com' },
    { name: 'EUGENIO COSTA CABRAL', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)98120-0396', email: 'eugeniocostacabral@hotmail.com' },
    { name: 'EVANILDA DA SILVA CORREA', team: 'VERMELHA', areas: ['CLEANING'], availability: [], phone: '(21)99560-1460', email: 'evanildacorrea@hotmail.com' },
    { name: 'EVANILDE MELO DE SOUZA SILVA', team: 'VERDE', areas: [], availability: [], phone: '(21)98779-5577', email: 'evanildemssilva@gmail.com' },
    { name: 'EVELLYN NUNES TAVEIRA PORTO', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99679-2688', email: 'evellynnt@gmail.com' },
    { name: 'EVELYN ALVES DE ARAÚJO BASTOS', team: 'AMARELA', areas: [], availability: [], phone: '(21)98003-1090', email: 'evbastos@id.uff.br' },
    { name: 'EVELYN LORENA DE CARVALHO CAMILO', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)99654-7302', email: 'evelynccamilo@icloud.com' },
    { name: 'EVERSON TRINDADE DOS SANTOS', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)98088-6205', email: 'eversontrin@gmail.com' },
    { name: 'FABIANE PORTO MOURA DE SOUZA', team: 'N/A', areas: ['SOM'], availability: [], phone: '(21)96406-1840', email: 'biane07@hotmail.com' },
    { name: 'FABIO FERREIRA SOTA', team: 'AZUL', areas: ['ILUMINAÇÃO'], availability: [], phone: '(21)97005-9442', email: 'fabio.brothers2018@gmail.com' },
    { name: 'FELIPE MUNIZ DOMINGOS', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98816-3192', email: 'felipemunizdomingos@gmail.com' },
    { name: 'FELIPE SILVA DE OLIVEIRA', team: 'N/A', areas: ['APOIO', 'COORDENAÇÃO DE CULTO', 'ESPAÇO VIP'], availability: [], phone: '(21)99801-4525', email: 'felipe.silva.oliveira@gmail.com' },
    { name: 'FERNANDA LOPES DOS SANTOS HORSTH', team: 'N/A', areas: ['STAFF'], availability: [], phone: '(21)98427-9493', email: 'fehorsth81@gmail.com' },
    { name: 'FERNANDO SILVA MANFREDI', team: 'N/A', areas: ['COORDENAÇÃO DE CULTO', 'ESPAÇO VIP'], availability: [], phone: '(21)96499-2240', email: 'fernandodsg@yahoo.com.br' },
    { name: 'FILIPE ALVES DE SANT\'ANNA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98319-3051', email: 'filipeads98@gmail.com' },
    { name: 'FILIPE DA SILVA NUNES', team: 'AZUL', areas: [], availability: [], phone: '(21)97693-1528', email: 'ofilipenunes@gmail.com' },
    { name: 'FLAVIA VANESSA FIGUEIRA FLORES', team: 'N/A', areas: ['INTERCESSÃO', 'RECEPCÃO'], availability: [], phone: '(21)99649-8313', email: 'flaviavanessafff@gmail.com' },
    { name: 'FLAVIO TAVARES MARQUES', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)98390-8530', email: 'flaviomarques1985@gmail.com' },
    { name: 'FRANCILENE MATIAS DA SILVA PATROCÍNIO', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)98134-8993', email: 'francipatrocinio@hotmail.com' },
    { name: 'FRANCINE ALMEIDA LIBORIO DE ARAUJO', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)97908-7276', email: 'francinealmeida80@yahoo.com' },
    { name: 'FRANCIS FERREIRA VILLAÇA', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)98271-3395', email: 'francisvillaca.c@gmail.com' },
    { name: 'FREDERICO FONSECA DA SILVA PINTO', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)99937-4663', email: 'adm.fred01@gmail.com' },
    { name: 'GABRIEL DA SILVA GONÇALVES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '', email: 'gabrielsilvagoncalves590@gmail.com' },
    { name: 'GABRIEL DOS SANTOS FERNANDES', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)99424-0830', email: 'feernandesgabriel@gmail.com' },
    { name: 'GABRIEL ELIAS DE SOUZA SIDACO ROSA', team: 'N/A', areas: ['STAFF'], availability: [], phone: '(21)98557-5755', email: 'gabriel-sidaco@hotmail.com' },
    { name: 'GABRIEL PEREIRA DA SILVA', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)99356-9988', email: 'gpsx.98@gmail.com' },
    { name: 'GABRIEL SOUZA ALMADA', team: 'AZUL', areas: [], availability: [], phone: '(21)96444-5694', email: 'gabrielanjos0107@gmail.com' },
    { name: 'GABRIELA CASTRO NUNES', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)97702-8852', email: 'hbrielacastro@gmail.com' },
    { name: 'GABRIELA PIRES MARINS DE OLIVEIRA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98952-4297', email: 'gabi.pmdo@gmail.com' },
    { name: 'GABRIELE IGNACIO CASTILHO SENA', team: 'AMARELA', areas: [], availability: [], phone: '(21)97886-3403', email: 'gabrielecsena@gmail.com' },
    { name: 'GABRIELLA DA SILVA NUNES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)96636-9642', email: 'ggabinunes35@gmail.com' },
    { name: 'GABRIELLA PEREIRA SANT\'ANNA', team: 'VERMELHA', areas: [], availability: [], phone: '(21)99805-2776', email: 'gabriellapereira01@gmail.com' },
    { name: 'GEANE MUNIZ MESQUITA DOMINGOS', team: 'AMARELA', areas: ['RECEPÇÃO'], availability: [], phone: '(21)96735-4202', email: 'muniz.geane@gmail.com' },
    { name: 'GENI PEREIRA DA CRUZ SANTANNA', team: 'AMARELA', areas: ['RECEPÇÃO'], availability: [], phone: '', email: 'genisantanna65@gmail.com' },
    { name: 'GILLIANE CELIZE DA COSTA RODRIGUES DE MOURA', team: 'N/A', areas: ['ESPAÇO VIP', 'INTERCESSÃO', 'RECEPÇÃO'], availability: [], phone: '(21)98025-0241', email: 'gilly.rodrigues@hotmail.com' },
    { name: 'GILSON MONTEIRO DE CARVALHO HORSTH', team: 'N/A', areas: ['STAFF'], availability: [], phone: '(21)98782-4362', email: 'gilsonhorsth@gmail.com' },
    { name: 'GIOVANA ROSA DOS SANTOS FREITAS', team: 'N/A', areas: ['BISTRO', 'RECEPÇÃO'], availability: [], phone: '(21)99114-8055', email: 'giovanarosafreitas@gmail.com' },
    { name: 'GIOVANNA MENCARI XAVIER', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)98723-2851', email: 'gimencarix@gmail.com' },
    { name: 'GISELE FONSECA SANTOS ROCHA', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)99326-7508', email: 'giselesantosfg@hotmail.com' },
    { name: 'GISELLE QUEIROZ PONTES', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)98782-8469', email: 'giselle.qp2012@gmail.com' },
    { name: 'GIULIA ACZA MOREIRA GUEDES', team: 'N/A', areas: ['STORIES'], availability: [], phone: '(21)95902-7368', email: 'guedesgiuliall@gmail.com' },
    { name: 'GIZELLE CAMPOS DE MESQUITA', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)99620-3738', email: '78gmsantos@gmail.com' },
    { name: 'GUILHERME ARAÚJO DE OLIVEIRA', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)98645-0100', email: 'guimoisal2@gmail.com' },
    { name: 'HADASSA RODRIGUES LIMA', team: 'VERMELHA', areas: ['CLEANING'], availability: [], phone: '(21)98664-2033', email: 'lrhada18@gmail.com' },
    { name: 'HENRIQUE NELAS LONGOBUCO', team: 'N/A', areas: ['ESPAÇO VIP', 'MUSIKIDS', 'PROFESSORES'], availability: [], phone: '(21)98797-2005', email: 'longobuco@gmail.com' },
    { name: 'HEVERSON BERNARDO DE SOUZA', team: 'N/A', areas: ['COORDENAÇÃO DE CULTO', 'ESPAÇO VIP'], availability: [], phone: '(21)96465-6672', email: 'blax.atos2@gmail.com' },
    { name: 'HIAGO CAMPOS MARENDINO', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)96522-7053', email: 'hiagocampos84@gmail.com' },
    { name: 'IASMIN NUNES SALES GUIMARÃES', team: 'AZUL', areas: [], availability: [], phone: '(21)96468-5635', email: 'iasminnunessales@gmail.com' },
    { name: 'ÍCARO DE PAIVA MAIA FERREIRA', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)99847-7393', email: 'icaropmf@gmail.com' },
    { name: 'IRENE GOMES DE CARVALHO DUARTE', team: 'N/A', areas: ['CLEANING', 'ESPAÇO VIP', 'INTERCESSÃO'], availability: [], phone: '(21)98740-5341', email: 'irenegdcd@gmail.com' },
    { name: 'ISABELA ALVES THURLER', team: 'VERMELHA', areas: [], availability: [], phone: '(21)98111-1111', email: 'belathurler@gmail.com' },
    { name: 'ISABELA DOS SANTOS TEIXEIRA BARRETO', team: 'N/A', areas: ['BOUTIQUE'], availability: [], phone: '(21)97392-4224', email: 'isabelateeixeira@gmail.com' },
    { name: 'ISABELA SODRE CHAME TAVARES DO COUTO', team: 'VERMELHA', areas: [], availability: [], phone: '(21)96556-2840', email: 'isabelastavares@gmail.com' },
    { name: 'ISABELLA DOS ANJOS AMORIM', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)97622-4989', email: 'isabelladosanjos08@gmail.com' },
    { name: 'ISABELLA GUINANCIO NASCIMENTO', team: 'VERDE', areas: ['DIS'], availability: [], phone: '(21)99796-1796', email: 'isabellaguinancio@id.uff.br' },
    { name: 'ISABELLE NUNES DA CONCEIÇÃO DE SOUZA', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)99222-3133', email: 'be_belle@live.com' },
    { name: 'ISAIAS DUARTE MESQUITA', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)97898-5814', email: 'duarrte@gmail.com' },
    { name: 'IVONE MARIA LUCIO', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)99400-6562', email: 'ivonelucio21@gmail.com' },
    { name: 'IZAAK SALEK DE OLIVEIRA CURY MERLIM', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)98198-3033', email: 'izaaksalek@gmail.com' },
    { name: 'IZABELLA TAVARES GONÇALVES SILVA', team: 'N/A', areas: ['INTERCESSÃO'], availability: [], phone: '(21)98735-9652', email: 'izabellatavares48@gmail.com' },
    { name: 'JAININE GOMES PEREIRA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)97374-8551', email: 'jaininegomes@gmail.com' },
    { name: 'JAQUELINE DE OLIVEIRA AZEVEDO', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)98061-7052', email: 'jaquelineoa@hotmail.com' },
    { name: 'JEAN MORAES DA SILVA', team: 'N/A', areas: ['BROADCASTING', 'COORDENAÇÃO DE CULTO', 'PROFESSORES'], availability: [], phone: '(21)99690-0553', email: 'contatojeanmoraes2@gmail.com' },
    { name: 'JECIANA BRUM PEREIRA OLIVEIRA', team: 'VERDE', areas: [], availability: [], phone: '(21)98815-6567', email: 'nanabrum@hotmail.com' },
    { name: 'JEFFERSON BARROSO JANUÁRIO', team: 'AMARELA', areas: [], availability: [], phone: '(21)97626-0256', email: 'jjanuario@id.uff.br' },
    { name: 'JEFFERSON MARINS PINTO', team: 'N/A', areas: ['LIVE'], availability: [], phone: '(21)96409-9334', email: 'jeffersonmarins05@gmail.com' },
    { name: 'JÉSSIKA RODRIGUES REISHOFFER MUNIZ', team: 'N/A', areas: ['INTERCESSÃO', 'RECEPÇÃO'], availability: [], phone: '(21)97605-9734', email: 'reishoffer.jessika@gmail.com' },
    { name: 'JHULY ZAINOTTI MONTEIRO', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '', email: 'jhulyzanotti6@icloud.com' },
    { name: 'JOAO PEDRO FONSECA QUIRINO', team: 'N/A', areas: ['ILUMINAÇÃO'], availability: [], phone: '(21)98705-9443', email: '08jpquirino@gmail.com' },
    { name: 'JOICE LAGOA DOS SANTOS COSTA', team: 'N/A', areas: ['BOUTIQUE'], availability: [], phone: '(21)99590-2998', email: 'joicelagoa@yahoo.com.br' },
    { name: 'JOICE PEREIRA DUARTE', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99989-8215', email: 'joice duarte007@hotmail.com' },
    { name: 'JONATAS LUIZ VALADARES LEAL', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)99725-2511', email: 'jonatas.lealengproducao@gmail.com' },
    { name: 'JORGE LUIZ DIAS LISBOA', team: 'N/A', areas: ['APOIO'], availability: [], phone: '(21)99494-2391', email: 'jorgeldlisboa@gmail.com' },
    { name: 'JORGE RENATO CRUZ DA MATTA', team: 'N/A', areas: ['SAÚDE'], availability: [], phone: '(21)97608-1478', email: 'renatongage@gmail.com' },
    { name: 'JOSÉ FERNANDES ROCHA', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)99391-9474', email: 'fernandez be@hotmail.com' },
    { name: 'JOSELI SANTOS DE PAIVA', team: 'AZUL', areas: [], availability: [], phone: '(21)98801-8641', email: 'josipaiva2013@gmail.com' },
    { name: 'JOSIAS LEONARDO DIAS', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)96558-7555', email: 'josiasleonardo2@gmail.com' },
    { name: 'JULIA ALVES VAZ DE AQUINO', team: 'AMARELA', areas: ['MUSIKIDS'], availability: [], phone: '(21)96826-2692', email: 'vaz.julia@gmail.com' },
    { name: 'JULIA ARANTES DE OLIVEIRA', team: 'VERMELHA', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99877-7771', email: 'juliaarantesdeoliveiral2@gmail.com' },
    { name: 'JÚLIA CORDEIRO RODRIGUES', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)98933-8798', email: 'jujubacs2002@gmail.com' },
    { name: 'JULIANA DA COSTA SANTOS DE SOUZA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)96599-5175', email: 'juliana.costasantos@yahoo.com.br' },
    { name: 'JULIANA LESSA RODRIGUES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)96763-8377', email: 'lessajuliana312@gmail.com' },
    { name: 'JULIANNA PEREIRA SANT\'ANNA', team: 'VERMELHA', areas: [], availability: [], phone: '(21)97206-2322', email: 'juliannasantanna.jps@gmail.com' },
    { name: 'JULIANO PORTO LAGOAS', team: 'N/A', areas: ['COORDENAÇÃO DE CULTO', 'ESPAÇO VIP', 'LIVE', 'SOM'], availability: [], phone: '(21)99856-9691', email: 'julianolagoas.ibm@gmail.com' },
    { name: 'JUSSARA DA SILVA CAMPOS', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)97252-7822', email: 'jussaradasilvacampos@hotmail.com' },
    { name: 'KAREM CRISTINA LIMA GUEDES DOS REIS SILVA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99388-9100', email: 'karenguedes97@gmail.com' },
    { name: 'KARINE BARROS DE OLIVEIRA', team: 'N/A', areas: ['ESPAÇO VIP', 'RECEPÇÃO'], availability: [], phone: '(21)99801-4529', email: 'karineocorrea@gmail.com' },
    { name: 'KAROLINE MOURA DA SILVA CABRAL', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)97254-5773', email: 'karolinemoura.s@hotmail.com' },
    { name: 'KAROLYNA VITÓRIA FERREIRA NASCIMENTO', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)99008-6063', email: 'karolynavitoria6@gmail.com' },
    { name: 'KATHELYN DINIZ SANTIAGO', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)99271-4665', email: 'santiagokasantiago@gmail.com' },
    { name: 'KATIA ALMEIDA PINTO', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)98559-5725', email: 'katia.almeidapinto@gmail.com' },
    { name: 'KEITI ALMEIDA ARAUJO', team: 'VERDE', areas: [], availability: [], phone: '(21)99595-5003', email: 'keitialmeidaaraujo@gmail.com' },
    { name: 'KELLY MONTEIRO SILVA NOGUEIRA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99420-1799', email: 'kellymonts@hotmail.com' },
    { name: 'KEREN SANTOS LEMOS ABDIAS', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)98666-9176', email: 'keh.cslemos@gmail.com' },
    { name: 'LAHIZ BORGES GUIMARÃES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98020-0720', email: 'lahizborges@gmail.com' },
    { name: 'LANA REIS MAIA MACEDO', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)98051-6438', email: 'lanarmmacedo@gmail.com' },
    { name: 'LARISSA DE SOUZA FRANCISCO LOPES', team: 'N/A', areas: ['BOUTIQUE'], availability: [], phone: '(21)99992-5497', email: 'larissasfbahia@gmail.com' },
    { name: 'LARISSE DA SILVA SOUZA', team: 'AZUL', areas: [], availability: [], phone: '(21)99362-6362', email: 'larissesiso@gmail.com' },
    { name: 'LEANDRO RIBEIRO NOGUEIRA', team: 'N/A', areas: ['DIS'], availability: [], phone: '(21)96021-6404', email: 'leandrorn.bio@gmail.com' },
    { name: 'LEONAM JALOTO AGUIAR COSTA', team: 'N/A', areas: ['SAUDE'], availability: [], phone: '(21)99978-4355', email: 'leonam.costa21@gmail.com' },
    { name: 'LEONARDO RODRIGUES DE MARINS', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)98986-5493', email: 'leonardo07marins@gmail.com' },
    { name: 'LEONE CÉSAR DOS SANTOS', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)96445-5356', email: 'leloliveira00@gmail.com' },
    { name: 'LETHICIA CRISTINA MEDEIROS GUIMARÃES GUTIERREZ', team: 'AMARELA', areas: [], availability: [], phone: '(21)98661-0275', email: 'lethiciagutierrez01@gmail.com' },
    { name: 'LETICIA DE MELO FIALHO', team: 'VERMELHA', areas: ['ESPAÇO VIP'], availability: [], phone: '(21)99468-8971', email: 'leticiamelofialho@gmail.com' },
    { name: 'LETICIA DE SOUZA CHRISTINO', team: 'VERMELHA', areas: [], availability: [], phone: '(21)98982-9043', email: 'leticiachristino21@gmail.com' },
    { name: 'LETICIA VIEIRA DE FARIAS', team: 'VERDE', areas: [], availability: [], phone: '(21)99754-2121', email: 'leticiaavfarias@gmail.com' },
    { name: 'LETÍCIA BLANCHE DE AMORIM DOMINGOS MIRANDA', team: 'AZUL', areas: [], availability: [], phone: '(21)97022-5580', email: 'leticiablanche@icloud.com' },
    { name: 'LILIA DA SILVA FREITAS', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99437-0182', email: 'liliarochadasilva3@gmail.com' },
    { name: 'LILIAN COSTA DE ANDRADE LEAL', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)96955-0959', email: 'liliannutricao@hotmail.com' },
    { name: 'LILIANNY GUIMARÃES MANFREDI', team: 'N/A', areas: ['ESPAÇO VIP', 'RECEPÇÃO'], availability: [], phone: '(21)96485-2756', email: 'lilypguimaraes@gmail.com' },
    { name: 'LILYAN DECOTHE CAMPANATTI', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)96722-3022', email: 'lilyancampanatti@gmail.com' },
    { name: 'LIVIA REZENDE RANGEL', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)97989-9151', email: 'liviarangel0612@gmail.com' },
    { name: 'LÍVIA PEREIRA DOS SANTOS SIMÃO', team: 'N/A', areas: ['BOUTIQUE'], availability: [], phone: '(21)99640-0156', email: 'liviapssimao@gmail.com' },
    { name: 'LÍVYA OLIVEIRA BARROS CORREA', team: 'VERMELHA', areas: [], availability: [], phone: '(21)99801-4521', email: 'livyaobcorrea@gmail.com' },
    { name: 'LIZANDRA DE JESUS PEREIRA', team: 'AMARELA', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)98469-6799', email: 'lilibruski@gmail.com' },
    { name: 'LORENA COSTA BARRETO OLIVEIRA', team: 'AZUL', areas: [], availability: [], phone: '(21)99444-0009', email: 'oliveira.anuncios123@gmail.com' },
    { name: 'LORENA DA ROCHA BAPTISTA', team: 'N/A', areas: ['COFFE BREAK'], availability: [], phone: '(21)98846-3749', email: 'lorenarocha301@gmail.com' },
    { name: 'LORENA ROSA DA CONCEIÇÃO MONTEIRO', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98104-5743', email: 'lorenarosa72@gmail.com' },
    { name: 'LOYDE SHAYLANE MOREIRA GUEDES', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)97538-3055', email: '1smguedes@gmail.com' },
    { name: 'LUANA MEDEIROS MACIEL', team: 'N/A', areas: ['SOM'], availability: [], phone: '(21)97974-2295', email: 'luanamedeirosdesousa@bom.com.br' },
    { name: 'LUCAS CUNHA DA SILVA', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)97898-4483', email: '1c95.abuh@gmail.com' },
    { name: 'LUCAS LUIZ CARVALHO MONTEIRO DE ANDRADE', team: 'N/A', areas: ['SOM'], availability: [], phone: '(21)99029-8379', email: 'lucasluizcarvalho33@gmail.com' },
    { name: 'LUCAS MUNIZ DOMINGOS', team: 'N/A', areas: ['ILUMINAÇÃO'], availability: [], phone: '(21)98562-0562', email: 'muniz.lucasmuniz03@gmail.com' },
    { name: 'LUCAS PORTO PEREIRA', team: 'AZUL', areas: [], availability: [], phone: '(21)99549-9776', email: 'lucasportop@gmail.com' },
    { name: 'LUCIA ELENA DA SILVA CAMPANATTI', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)98687-5820', email: 'luciaederlon@hotmail.com' },
    { name: 'LUCIANA PECLAT GONÇALVES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98537-2241', email: 'peclatlucianapeclat@gmail.com' },
    { name: 'LUCIANO DE PAULA FERNANDES', team: 'N/A', areas: ['APOIO', 'COORDENAÇÃO DE CULTO'], availability: [], phone: '(21)97877-8381', email: 'lucianofernandes515@gmail.com' },
    { name: 'LUIS HENRIQUE ROSA SETIMI', team: 'N/A', areas: ['ESPAÇO VIP'], availability: [], phone: '(21)98215-3948', email: 'luisetimi@gmail.com' },
    { name: 'LUIZ FELIPE FIGUEIREDO CORREA', team: 'N/A', areas: ['APOIO'], availability: [], phone: '(21)98851-8059', email: 'luiz.felipefc@gmail.com' },
    { name: 'LUZIMERI CRISTINA RODRIGUES FERREIRA MUNIZ', team: 'N/A', areas: ['CLEANING', 'INTERCESSÃO', 'RECEPÇÃO'], availability: [], phone: '(21)96482-4745', email: '' },
    { name: 'LYZAMARA NUNES LACERDA DA CONCEIÇÃO', team: 'AZUL', areas: ['ESPAÇO VIP'], availability: [], phone: '(21)97951-7118', email: 'lyznunes@gmail.com' },
    { name: 'MARCELLO VINHAS VERÇULINO', team: 'N/A', areas: ['STAFF'], availability: [], phone: '(21)99141-8686', email: 'marcello.vinas.40@gmail.com' },
    { name: 'MARCELO ALEXANDRE MASSOTO DA SILVA', team: 'N/A', areas: ['COORDENAÇÃO DE CULTO', 'ESPAÇO VIP'], availability: [], phone: '(21)99425-1689', email: 'marcello.massoto@gmail.com' },
    { name: 'MARCELO DANIEL DA SILVA CARNEIRO', team: 'N/A', areas: ['SOM'], availability: [], phone: '(21)99984-3328', email: 'marcelodaniel033@gmail.com' },
    { name: 'MARCIO DA SILVA ALMEIDA', team: 'AZUL', areas: ['EKLESIA', 'ESPAÇO VIP', 'PROFESSORES'], availability: [], phone: '(21)99702-1707', email: 'madasial@gmail.com' },
    { name: 'MARCO ANTÔNIO MENDES DA SILVA', team: 'N/A', areas: ['ILUMINAÇÃO'], availability: [], phone: '(21)97523-9150', email: 'marcomendessv@gmail.com' },
    { name: 'MARCOS ALEXANDRE DO ESPÍRITO SANTO', team: 'N/A', areas: ['ESPAÇO VIP', 'PROFESSORES'], availability: [], phone: '(21)98160-0134', email: 'marcos.santo@enel.com' },
    { name: 'MARCOS JUNIOR ASSUMPÇÃO ALBERNAZ', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)97202-5077', email: 'assumpmarcosmj@gmail.com' },
    { name: 'MARCUS VINICIUS BIGNON DA COSTA', team: 'N/A', areas: ['APOIO'], availability: [], phone: '(21)98618-0228', email: 'bignondacosta@hotmail.com' },
    { name: 'MARIA AUXILIADORA ROCHA FERREIRA CALDAS', team: 'N/A', areas: ['INTERCESSÃO', 'STAFF'], availability: [], phone: '(21)98642-8801', email: 'maricaldas79@gmail.com' },
    { name: 'MARIA CLARA PRADO DE ABREU CADIMO', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)99520-0434', email: 'mariaclarapradoo@hotmail.com' },
    { name: 'MARIA DA CONCEIÇÃO DA SILVA NEVES CARDOSO', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)98410-4329', email: 'dedeimaria66@gmail.com' },
    { name: 'MARIA DAS GRAÇAS PEREIRA DINIZ', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)96884-9797', email: 'marygracy.diniz@gmail.com' },
    { name: 'MARIA DO CARMO DA SILVA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98756-8280', email: 'carmosilva2165@hotmail.com' },
    { name: 'MARIA EDUARDA CAMPOS ALBERTINO', team: 'VERMELHA', areas: [], availability: [], phone: '(21)98774-8106', email: 'costadasilvam724@gmail.com' },
    { name: 'MARIA EDUARDA COSTA DA SILVA', team: 'AZUL', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)92006-4368', email: 'dudacampos_reserva@hotmail.com' },
    { name: 'MARIA EDUARDA LIMA DE FARIAS', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)97414-7562', email: 'mariaeduardalimadefarias5@gmail.com' },
    { name: 'MARIA EDUARDA MARINS GONÇALVES', team: 'N/A', areas: ['CLEANING', 'BISTRO'], availability: [], phone: '(21)97007-2530', email: 'madumarinsgoncalves@gmail.com' },
    { name: 'MARIA EDUARDA ROCHA NUNES', team: 'N/A', areas: ['BOUTIQUE'], availability: [], phone: '(21)99173-0654', email: 'mariarocr21@gmail.com' },
    { name: 'MARIA REGINA PEREIRA DOS REIS EMERICK', team: 'N/A', areas: ['COFFE BREAK'], availability: [], phone: '(21)99388-4976', email: 'mreginaemerick@gmail.com' },
    { name: 'MARIA RITA DE CASSIA CALISPTO DA SILVA', team: 'N/A', areas: ['STORIES'], availability: [], phone: '(21)98649-7089', email: 'mariaritacalispto@gmail.com' },
    { name: 'MARIA RITA DE CÁSSIA CALISPTO DA SILVA', team: 'N/A', areas: ['BOUTIQUE'], availability: [], phone: '(21)98649-7089', email: 'mariaritacalispto@gmail.com' },
    { name: 'MARIANGELA PINHEIRO DE CARVALHO COSTA', team: 'N/A', areas: ['COFFE BREAK'], availability: [], phone: '(21)99693-9399', email: 'mariangelapccosta@gmail.com' },
    { name: 'MARILIA ROCHA', team: 'N/A', areas: ['ILUMINAÇÃO'], availability: [], phone: '(21)97581-0155', email: 'mariliarfp@gmail.com' },
    { name: 'MARILZA LESSA SIQUEIRA', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)98402-8633', email: 'marulessa@outlook.com' },
    { name: 'MARINA DE CARVALHO COSTA MOURA', team: 'N/A', areas: ['PROFESSORES'], availability: [], phone: '(21)97150-0375', email: 'mariccosta99@gmail.com' },
    { name: 'MARLON CADIMO NÓVOA SILVA', team: 'N/A', areas: ['SECURITY'], availability: [], phone: '(21)99165-3444', email: 'marlon.novoa@hotmail.com' },
    { name: 'MARLON JACKSON DA SILVA BAPTISTA', team: 'N/A', areas: ['INTERCESSÃO'], availability: [], phone: '(21)97205-7054', email: 'marlon231lmoretson@hotmail.com' },
    { name: 'MATEUS GUIMARÃES SCHWARTZ FARIA', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)96607-7759', email: 'mateusg.schwartz@gmail.com' },
    { name: 'MATHEUS DE SOUZA CARVALHO', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)99978-2497', email: 'ma carvalho@id.uff.br' },
    { name: 'MATHEUS LUIZ GRAÇA DA SILVA', team: 'N/A', areas: ['DIS'], availability: [], phone: '(21)98939-7255', email: 'mtssilva2324@gmail.com' },
    { name: 'MAYANA DOS SANTOS BORGES', team: 'N/A', areas: ['INTERCESSÃO'], availability: [], phone: '(21)97582-7149', email: 'mayanaborges2@gmail.com' },
    { name: 'MIGUEL ANGELO DO PATROCÍNIO', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98128-6344', email: 'mapatrocinio@gmail.com' },
    { name: 'MIRIAM CARRARI DE MATTOS COELHO', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)98974-4954', email: 'm.carrari@gmail.com' },
    { name: 'MONICA FONSECA MARTINS', team: 'AZUL', areas: ['ESPAÇO VIP', 'RECEPÇÃO'], availability: [], phone: '(21)98836-2274', email: 'quirinocbmerj@gmail.com' },
    { name: 'MONIQUE HARDOIM DOS SANTOS LAGOAS', team: 'VERDE', areas: ['BROADCASTING', 'RECEPÇÃO'], availability: [], phone: '(21)97043-1195', email: 'moniquehardoim@gmail.com' },
    { name: 'MÔNICA LACERDA', team: 'VERDE', areas: [], availability: [], phone: '(91)98340-1848', email: 'monikalacerda21@gmail.com' },
    { name: 'MYLENA FERREIRA MACHADO', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)97267-9469', email: 'mylenaferreira0502@gmail.com' },
    { name: 'MYLLENA DA SILVA TAVARES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98225-3546', email: 'myllena.tavaress@gmail.com' },
    { name: 'MYLLENA SANTIAGO DOS SANTOS', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)99828-8871', email: 'santiagomyllena@gmail.com' },
    { name: 'NATALIA BRAGA RODRIGUES', team: 'N/A', areas: ['COORDENAÇÃO DE CULTO'], availability: [], phone: '(21)97028-8111', email: 'nataliadvogada01@gmail.com' },
    { name: 'NATHALIA LUZIA DE SOUSA SILVA CORREA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98158-6266', email: 'nathalia.turbotruck@gmail.com' },
    { name: 'NATHAN MARTINS CARNEIRO', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)96736-6940', email: 'nathan.carneiro23011@gmail.com' },
    { name: 'NEANDER MARINS GUIMARÃES', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)96468-5630', email: 'neander92@gmail.com' },
    { name: 'NEIDE APARECIDA DA CONCEIÇÃO', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)99955-2713', email: 'neydeconceicao5514@gmail.com' },
    { name: 'NEVITON FREITAS SIQUEIRA', team: 'VERDE', areas: [], availability: [], phone: '(21)98654-3408', email: 'nevitonsiqueira@yahoo.com' },
    { name: 'NICOLAS LAGOA DOS SANTOS COSTA', team: 'VERMELHA', areas: [], availability: [], phone: '(21)97134-5573', email: 'duduguittar28@gmail.com' },
    { name: 'NICOLE BARBOSA MEIRELLES DE SANT\'ANNA', team: 'VERDE', areas: ['EKLESIA'], availability: [], phone: '(21)98036-3662', email: 'nicolebmeirelles@gmail.com' },
    { name: 'NICOLE SILVA BORGES', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)97126-3178', email: 'nickborges06@gmail.com' },
    { name: 'OLIVEIRA', team: 'AZUL', areas: ['SECURITY'], availability: [], phone: '(21)98661-0275', email: 'lethiciagutierrez01@gmail.com' },
    { name: 'PATRICIA DUTRA NOGUEIRA FERREIRA', team: 'VERMELHA', areas: ['BISTRO'], availability: [], phone: '(21)99328-8614', email: 'dutra269@gmail.com' },
    { name: 'PATRÍCIA DAVIS FERREIRA FREITAS MARQUES', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)97361-3550', email: 'patriciadfreitas21@gmail.com' },
    { name: 'PATRÍCIA LÚCIO DO VALE', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98154-5270', email: 'patriciasodre05@gmail.com' },
    { name: 'PATRYCIA ANNE GONÇALVES NUNES DE SOUZA DA SILVA', team: 'N/A', areas: ['ESPAÇO VIP'], availability: [], phone: '(21)99161-2928', email: 'silvapattyanne@gmail.com' },
    { name: 'PAULA ALVES MIRANDA', team: 'N/A', areas: ['INTERCESSÃO'], availability: [], phone: '(21)98208-9326', email: 'alvesmirandapaula@gmail.com' },
    { name: 'PAULA CRISTINA JESUS NUNES DE OLIVEIRA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)96803-1591', email: 'paula.nunesoliveira13@gmail.com' },
    { name: 'PAULA RAMOS DE ARAUJO DE SOUZA', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)98745-5032', email: 'paulaaraujosouza7@gmail.com' },
    { name: 'PAULO CEZAR AROUCA BALTHAR', team: 'VERMELHA', areas: [], availability: [], phone: '(21)97976-4499', email: 'paulocezarrr97@gmail.com' },
    { name: 'PAULO ROBERTO SANTOS DE SOUZA', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)98454-2165', email: 'paulloroberto87@gmail.com' },
    { name: 'PEDRO HENRIQUE SOUSA DO COUTO', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)98229-0443', email: 'phsousacouto@gmail.com' },
    { name: 'PEDRO PAULO BRAGA MARINS MIRANDA', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)99577-2031', email: 'p.marins@hotmail.com' },
    { name: 'PETER DE SOUZA BORGES', team: 'N/A', areas: ['APOIO'], availability: [], phone: '(21)97034-3054', email: 'petersouzaborges@hotmail.com' },
    { name: 'PR. HUGO CAMPOS DE SOUZA', team: 'N/A', areas: ['ILUMINAÇÃO'], availability: [], phone: '(21)99524-7838', email: 'hugocamposdesouza@hotmail.com' },
    { name: 'PRISCYLLA VITORIA OLIVEIRA DE MORAES DO NASCIMENTO', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)99199-5547', email: 'vitoria_pri@hotmail.com' },
    { name: 'QUEILA DE MELLO GAUTER', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)99780-4063', email: 'queilagaute@gmail.com' },
    { name: 'RAFFAEL DA SILVA RAINHA', team: 'N/A', areas: ['PROFESSORES'], availability: [], phone: '(21)99324-4404', email: 'raffaelrainha@gmail.com' },
    { name: 'RAIANI DE AZEREDO CASSILHA', team: 'N/A', areas: ['STORIES', 'SAÚDE'], availability: [], phone: '(21)98601-4349', email: 'raianiazeredo@gmail.com' },
    { name: 'RAILTON SERGIO DE OLIVEIRA FERREIRA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99322-6754', email: 'railtonsergioof@gmail.com' },
    { name: 'RAMON ABDIAS', team: 'AZUL', areas: [], availability: [], phone: '(21)98288-1930', email: 'ramon.abdias@gmail.com' },
    { name: 'RAMON DA COSTA RODRIGUES', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)98698-9041', email: 'ramon.rodrigues1467@gmail.com' },
    { name: 'RAMON PATRIC DE AZEVEDO SILVA', team: 'N/A', areas: ['INTERCESSÃO'], availability: [], phone: '(21)96531-3426', email: 'rapatric98@gmail.com' },
    { name: 'RAPHAEL DA SILVA ROZA', team: 'N/A', areas: ['SOM', 'ILUMINAÇÃO'], availability: [], phone: '(21)99450-6143', email: 'raphaelzroza@gmail.com' },
    { name: 'RAPHAEL FERNANDO GOULART DA SILVA', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)97575-9386', email: 'ralphgoulart@outlook.com' },
    { name: 'RAQUEL BOURQUARD CORREIA', team: 'N/A', areas: ['MUSIKIDS', 'SOM'], availability: [], phone: '(21)98582-1688', email: 'rbourquard@id.uff.br' },
    { name: 'RAQUEL GOMES DE AGUIAR', team: 'N/A', areas: ['STAFF'], availability: [], phone: '(21)97013-9233', email: 'raquelgomes.2016.vitor@gmail.com' },
    { name: 'RAQUEL GOMES VC DUARTE', team: 'N/A', areas: ['DIS'], availability: [], phone: '(21)97449-0006', email: 'raquelgomesduarte@gmail.com' },
    { name: 'RAQUEL RIBEIRO GONCALVES', team: 'N/A', areas: ['ESPAÇO VIP'], availability: [], phone: '(21)96549-5744', email: 'raquel.ribeiro93@yahoo.com' },
    { name: 'RAQUEL SOUSA DO ESPÍRITO SANTO', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)96921-7260', email: 'raquelsousa4r@icloud.com' },
    { name: 'REGIA MARIA HOLANDA OLIVEIRA', team: 'VERDE', areas: ['PROJEÇÃO'], availability: [], phone: '(21)96861-9586', email: 'regia oliveira@hotmail.com' },
    { name: 'REGINA CELIA EVANGELISTA NOGUEIRA DA SILVA', team: 'VERDE', areas: [], availability: [], phone: '(21)96472-8132', email: 'alinepedrogiovani@hotmail.com' },
    { name: 'REGINA DE OLIVEIRA SOUZA DA SILVA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98886-9796', email: 'reginasouzasilva@hotmail.com' },
    { name: 'REGINALDO GOMES PINHEIRO', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)98656-2038', email: 'reginaldogp46@gmail.com' },
    { name: 'REJANE VIEIRA DE FARIAS', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99754-9905', email: 'rejane.v.farias@gmail.com' },
    { name: 'RENAN DE CARVALHO COSTA', team: 'N/A', areas: ['APOIO'], availability: [], phone: '(21)97217-1582', email: 'renancarvalhoc06@gmail.com' },
    { name: 'RENANN FERNANDES FIALHO', team: 'VERDE', areas: ['STAFF'], availability: [], phone: '(21)97032-0547', email: 'renannfialho@icloud.com' },
    { name: 'RITA DE CASSIA RIBEIRO DOS SANTOS', team: 'N/A', areas: ['ESPAÇO VIP'], availability: [], phone: '(21)99132-4778', email: 'ritafgsantos346@gmail.com' },
    { name: 'RODRIGO DE OLIVEIRA MOREIRA RODRIGUES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21) 99902-8355', email: 'rodrigobina22@gmail.com' },
    { name: 'RODRIGO DUARTE PINTO GOMES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98766-5007', email: 'rodrigojnsse@gmail.com' },
    { name: 'ROGÉRIO RIBEIRO FERNANDES', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)98530-5547', email: 'rogeresmo78@gmail.com' },
    { name: 'RONALD TORRES CABRAL', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98367-8570', email: 'ronaldcabral95@gmail.com' },
    { name: 'ROSANE SIQUEIRA DE SOUZA', team: 'N/A', areas: ['COORDENAÇÃO DE CULTO'], availability: [], phone: '(21)97863-0007', email: 'rosaneelaura10@gmail.com' },
    { name: 'ROSIANE MOTTA DA SILVA E SILVA', team: 'N/A', areas: ['STAFF', 'BISTRO', 'COFFE BREAK'], availability: [], phone: '(21)96762-6766', email: 'rosianemottadr@gmail.com' },
    { name: 'ROWENNA E SILVA COUBELLE DE SOUZA', team: 'N/A', areas: ['ESPAÇO VIP'], availability: [], phone: '(21)98622-0472', email: 'rowenna_coubelle@hotmail.com' },
    { name: 'RUAN CARLOS TRUGILHO CANDIDO', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98267-3910', email: 'pastorruantrugilho@gmail.com' },
    { name: 'RULIAN NASCIMENTO MONTEIRO', team: 'AMARELA', areas: [], availability: [], phone: '(21)99586-6893', email: 'rulinascimento@hotmail.com' },
    { name: 'SALVADOR MOURA LUIZ', team: 'N/A', areas: ['ESTACIONAMENTO'], availability: [], phone: '(21)96674-1141', email: 'smluiz52@gmail.com' },
    { name: 'SAMUEL NICOLAS PAVÃO VIANA DA SILVA', team: 'N/A', areas: ['STAFF', 'APOIO'], availability: [], phone: '(21)98212-7087', email: 'samuel.nicolasr7@gmail.com' },
    { name: 'SANDRA REGINA BARBOSA TAVARES MASSOTO', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)98849-0333', email: 'sandra.massoto@gmail.com' },
    { name: 'SANDRIELE NEVES CARRARO COSTA', team: 'N/A', areas: ['STAFF'], availability: [], phone: '(21)96565-6795', email: 'sandynevescarraro@gmail.com' },
    { name: 'SARA BEATRIZ ROCHA DE QUEIROZ', team: 'AMARELA', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98614-0797', email: 'sarabeabeatriz.sb@gmail.com' },
    { name: 'SARA MACHADO DOS SANTOS', team: 'AZUL', areas: [], availability: [], phone: '(21)98082-2038', email: 'saramsantosprincesa@gmail.com' },
    { name: 'SARAH GONÇALVES MARTINS', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)98673-2616', email: 'sarahppgon@gmail.com' },
    { name: 'SARAH PEREIRA FREITAS', team: 'N/A', areas: ['PROJEÇÃO'], availability: [], phone: '(21)99555-8684', email: 'savinhamsantos@gmail.com' },
    { name: 'SAVIA MACHADO SOARES DOS SANTOS', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)96403-9556', email: 'selmaignaciosena@gmail.com' },
    { name: 'SELMA IGNACIO CASTILHO SENA', team: 'VERDE', areas: [], availability: [], phone: '(21)99196-7132', email: 'sricardocouto@yahoo.com.br' },
    { name: 'SERGIO RICARDO COUTO FILHO', team: 'N/A', areas: ['RECEPÇÃO', 'LIVE'], availability: [], phone: '(21)99196-7132', email: 'sricardocouto@yahoo.com.br' },
    { name: 'SERGIO ROBERTO BARCELLOS DA COSTA FILHO', team: 'N/A', areas: ['SOM'], availability: [], phone: '(21)97502-1046', email: 'sergiobarcellos.filho@gmail.com' },
    { name: 'SHARLONY GOMES CABRAL DO NASCIMENTO', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)99558-4912', email: 'sharlony.gon@gmail.com' },
    { name: 'SHEILA CRISTINA FERMIANO MONTEIRO PINHEIRO', team: 'N/A', areas: ['BOUTIQUE'], availability: [], phone: '(21)98836-9883', email: 'boutiquedabeleza44@gmail.com' },
    { name: 'SIMONE ANTUNES FERNANDES DE SOUZA', team: 'AZUL', areas: [], availability: [], phone: '(21)98484-6991', email: 'simoneantunes.fs@gmail.com' },
    { name: 'SIMONE DOS SANTOS SILVA BORGES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99755-4159', email: 'syssyborgesl@gmail.com' },
    { name: 'SOPHIA ZAINOTTI MONTEIRO', team: 'AMARELA', areas: [], availability: [], phone: '(21)97558-4604', email: 'sosozainottii@icloud.com' },
    { name: 'SÔNIA MARIA DE OLIVEIRA MONTEIRO', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)98659-1264', email: 'semmonteiro@hotmail.com' },
    { name: 'SUELI SOLANGE FERREIRA VILLAÇA', team: 'AZUL', areas: [], availability: [], phone: '(21)96990-9309', email: 'suelisfvillaca@gmail.com' },
    { name: 'SUELLEN CALISPTO MONTEIRO DA SILVA', team: 'N/A', areas: ['FOTOGRAFIA'], availability: [], phone: '(21)97368-4801', email: 'suellencalispto@yahoo.com.br' },
    { name: 'SUELLEN LEAL DO ESPÍRITO SANTO', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)96992-1209', email: 'susu.leal@hotmail.com' },
    { name: 'SUELY COSTA FONSECA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98698-9410', email: 'suelycosta452@gmail.com' },
    { name: 'SUSANE BATISTA ALVES THURLER', team: 'VERDE', areas: [], availability: [], phone: '(21)98928-4264', email: 'susithurler@gmail.com' },
    { name: 'SYLAS VIEIRA BUENO', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)97656-0493', email: 'sylasvieirab@gmail.com' },
    { name: 'TAIS SANTOS MORETSON BAPTISTA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)99514-0096', email: 'taismoretson@hotmail.com' },
    { name: 'TAMIRES NASCIMENTO DA SILVA', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)98253-3871', email: 'tamiresnascimentodasilva29@gmail.com' },
    { name: 'TAMIRIS LIMA FIDELIS', team: 'AMARELA', areas: [], availability: [], phone: '(21)99114-1996', email: 'tamirislimafidelis@gmail.com' },
    { name: 'TAYANE DOS SANTOS TEIXEIRA FONSECA', team: 'N/A', areas: ['BOUTIQUE', 'COFFE BREAK'], availability: [], phone: '(21)99521-9152', email: 'tayanedsteixeira@gmail.com' },
    { name: 'TAYS SANTOS TAMANDARE', team: 'N/A', areas: ['BOUTIQUE'], availability: [], phone: '(21)99709-1510', email: 'tays.tamandare04@yahoo.com.br' },
    { name: 'THAISSA MAIA PINTO DE ABREU', team: 'AZUL', areas: [], availability: [], phone: '(21)98819-4722', email: 'thaissamaia23@gmail.com' },
    { name: 'THALLYSON FILIPE DE MOURA BATISTA', team: 'VERDE', areas: ['RECEPÇÃO', 'ESPAÇO VIP'], availability: [], phone: '(21)97995-5247', email: 'thallysonfilipemoura@gmail.com' },
    { name: 'THATIANA ALMEIDA MACIEL', team: 'N/A', areas: [], availability: [], phone: '(21)99336-5017', email: '' },
    { name: 'THAYS BATISTA NASCIMENTO', team: 'N/A', areas: ['SOM'], availability: [], phone: '(21)98705-4845', email: 'thaysbatistanascimento658@gmail.com' },
    { name: 'THERESA TEMPERINI SOUZA', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)98679-6303', email: 'tttemperini@gmail.com' },
    { name: 'THIAGO DIAS DE SOUZA MOURA', team: 'VERMELHA', areas: ['MUSIKIDS', 'COORDENAÇÃO DE CULTO', 'EKLESIA', 'PROFESSORES'], availability: [], phone: '(21)98900-1302', email: 'thiago-ddsm@hotmail.com' },
    { name: 'THIAGO GRASSINI DE SOUZA', team: 'N/A', areas: [], availability: [], phone: '(21)97045-7947', email: 'thiagograssini2013@gmail.com' },
    { name: 'THIAGO LOPES DA SILVA', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)99159-1272', email: 'lthiago1986@gmail.com' },
    { name: 'THIAGO PEREIRA DA SILVA CHAVES', team: 'N/A', areas: ['SOM'], availability: [], phone: '(21)99896-6829', email: 'thiagoperreira9@gmail.com' },
    { name: 'THUAN DE LIMA SILVA', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)98274-9759', email: 'thuanlima3@gmail.com' },
    { name: 'THUANE BARBOSA LOPES', team: 'N/A', areas: ['STORIES'], availability: [], phone: '(21)97604-9302', email: 'thuane.bbs03@gmail.com' },
    { name: 'UESLEI MENDONÇA RODRIGUES', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)96443-4706', email: 'uesleiabc@gmail.com' },
    { name: 'VANESSA ARAÚJO TEIXEIRA TAVARES', team: 'VERMELHA', areas: [], availability: [], phone: '(21)99436-3458', email: 'arateixa@gmail.com' },
    { name: 'VANESSA MESQUITA RANGEL', team: 'N/A', areas: ['INTERCESSÃO', 'RECEPÇÃO'], availability: [], phone: '(21)97888-3711', email: 'vanessammesquita8@gmail.com' },
    { name: 'VANESSA OLIVEIRA LOPES', team: 'N/A', areas: ['APOIO'], availability: [], phone: '(21)98612-7801', email: 'vanessalopesrj@hotmail.com' },
    { name: 'VANESSA PEREIRA RANGEL RAMOS', team: 'VERMELHA', areas: [], availability: [], phone: '(21)99486-8551', email: 'rdsramos1@hotmail.com' },
    { name: 'VANESSA REIS FIGUEIRA', team: 'N/A', areas: ['CLEANING', 'INTERCESSÃO'], availability: [], phone: '(21)97739-3043', email: 'vanessarfigueira@gmail.com' },
    { name: 'VÂNIA LÉA SANTOS DIAS', team: 'N/A', areas: ['CLEANING'], availability: [], phone: '(21)97747-2852', email: 'vanialea343@gmail.com' },
    { name: 'VERONICA DE OLIVEIRA FIRMINO DE SOUZA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98705-3604', email: 'veronicaoliveira2003@gmail.com' },
    { name: 'VICTOR CASTRO BARROZO', team: 'VERDE', areas: [], availability: [], phone: '(21)98570-9715', email: 'castrosan94@gmail.com' },
    { name: 'VICTORIA DA SILVA SOUZA DE SÁ', team: 'N/A', areas: ['MUSIKIDS'], availability: [], phone: '(21)97039-5095', email: '' },
    { name: 'VILMA GOMES TRINDADE', team: 'N/A', areas: ['BISTRO'], availability: [], phone: '(21)97321-6708', email: 'gomesvilma444@gmail.com' },
    { name: 'VITÓRIA MOTTA DA SILVA', team: 'AMARELA', areas: [], availability: [], phone: '(21)99645-0221', email: 'vmottadasilvaa@gmail.com' },
    { name: 'VITÓRIA TAVARES DA COSTA', team: 'N/A', areas: ['BROADCASTING'], availability: [], phone: '(21)96696-2485', email: 'vitoriatavaresc16@gmail.com' },
    { name: 'WELSON PINHEIRO', team: 'N/A', areas: [], availability: [], phone: '(21)99448-4720', email: 'ti co34@hotmail.com' },
    { name: 'WILSON MICHAEL GOUDARD MONTEIRO', team: 'N/A', areas: ['APOIO'], availability: [], phone: '(21)98581-3881', email: 'michaelgoudard@outlook.com' },
    { name: 'YASMIM CALAZANS PEREIRA DE QUEIROZ', team: 'N/A', areas: ['STAFF'], availability: [], phone: '(21)97751-1689', email: 'ycalazanspereira@gmail.com' },
    { name: 'YASMIM SANT\'ANNA LIMA', team: 'N/A', areas: ['RECEPÇÃO'], availability: [], phone: '(21)98445-1779', email: 'yasmimsantanna64@gmail.com' },
    { name: 'YOLANDA NICOLE DE OLIVEIRA SOUZA', team: 'AZUL', areas: ['ESPAÇO VIP'], availability: [], phone: '(21)99686-7388', email: 'nicoleesouzaal@gmail.com' },
  ];
// --- END TEMPORARY DATA ---


const volunteerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  team: z.string().min(1, "Equipe é obrigatória"),
  areas: z.array(z.string()).min(1, "Selecione ao menos uma área"),
  availability: z.array(z.string()),
  phone: z.string().optional(),
  email: z.string().email({ message: "Email inválido" }).optional().or(z.literal('')),
});

export default function VolunteersPage() {
  const { volunteers, teams, areasOfService, events, updateVolunteer, addVolunteer, deleteVolunteer, loading } = useAppData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const [isImporting, startImportTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof volunteerSchema>>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { name: '', team: '', areas: [], availability: [], phone: '', email: '' },
  });

  const availabilityItems = React.useMemo(() => Array.from(new Set(events.map(e => e.name))), [events]);
  const allTeams = React.useMemo(() => [...teams.map(t => t.name), "N/A"], [teams]);
  
  function handleAdd() {
    setSelectedVolunteer(null);
    form.reset({ name: '', team: 'N/A', areas: [], availability: [], phone: '', email: '' });
    setIsDialogOpen(true);
  }

  function handleEdit(volunteer: Volunteer) {
    setSelectedVolunteer(volunteer);
    form.reset(volunteer);
    setIsDialogOpen(true);
  }

  function handleDelete(volunteer: Volunteer) {
    setSelectedVolunteer(volunteer);
    setIsDeleteDialogOpen(true);
  }

  function confirmDelete() {
    if (selectedVolunteer) {
        deleteVolunteer(selectedVolunteer.id);
        toast({
            title: "Sucesso!",
            description: "Voluntário excluído.",
        });
        setIsDeleteDialogOpen(false);
        setSelectedVolunteer(null);
    }
  }

  function handleTeamChange(volunteerId: string, newTeam: string) {
    const volunteer = volunteers.find(v => v.id === volunteerId);
    if (volunteer) {
        updateVolunteer(volunteerId, { ...volunteer, team: newTeam });
        toast({
            title: "Equipe Atualizada",
            description: `${volunteer.name} agora está na equipe ${newTeam}.`
        });
    }
  }

  const handleImport = () => {
    startImportTransition(async () => {
      toast({
        title: 'Iniciando Importação',
        description: `Cadastrando ${volunteersToImport.length} voluntários. Isso pode levar um momento...`,
      });

      try {
        for (const volunteerData of volunteersToImport) {
          // Check if volunteer already exists by name to avoid duplicates
          const exists = volunteers.some(v => v.name.toLowerCase() === volunteerData.name.toLowerCase());
          if (!exists) {
            await addVolunteer(volunteerData);
          }
        }
        toast({
          title: 'Importação Concluída!',
          description: 'Todos os voluntários foram cadastrados com sucesso.',
          className: "bg-primary text-primary-foreground",
        });
      } catch (error) {
        console.error("Erro durante a importação:", error);
        toast({
          variant: 'destructive',
          title: 'Erro na Importação',
          description: 'Ocorreu um erro ao cadastrar os voluntários. Verifique o console para mais detalhes.',
        });
      }
    });
  };


  function onSubmit(data: z.infer<typeof volunteerSchema>) {
    const volunteerData = {
        name: data.name,
        team: data.team,
        areas: data.areas,
        availability: data.availability,
        phone: data.phone,
        email: data.email,
    };

    if (selectedVolunteer) {
        // Edit
        updateVolunteer(selectedVolunteer.id, volunteerData);
        toast({
            title: "Sucesso!",
            description: "Voluntário atualizado.",
            className: "bg-primary text-primary-foreground",
        });
    } else {
        // Add
        addVolunteer(volunteerData);
        toast({
            title: "Sucesso!",
            description: "Novo voluntário adicionado.",
            className: "bg-primary text-primary-foreground",
        });
    }
    
    setIsDialogOpen(false);
    setSelectedVolunteer(null);
    form.reset();
  }

  const filteredVolunteers = volunteers.filter(volunteer => {
    const nameMatch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const teamMatch = teamFilter === 'all' || volunteer.team === teamFilter;
    const areaMatch = areaFilter === 'all' || volunteer.areas.includes(areaFilter);
    const availabilityMatch = availabilityFilter === 'all' || volunteer.availability.includes(availabilityFilter);
    return nameMatch && teamMatch && areaMatch && availabilityMatch;
  }).sort((a, b) => a.name.localeCompare(b.name));
  
  const showImportButton = volunteers.length < volunteersToImport.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerenciar Voluntários</h1>
        <p className="text-muted-foreground">Adicione, visualize e gerencie os voluntários.</p>
      </div>

      <Card>
        <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                 <div>
                    <CardTitle>Lista de Voluntários</CardTitle>
                    <CardDescription>Todos os voluntários cadastrados no sistema.</CardDescription>
                </div>
                <div className="flex flex-col-reverse sm:flex-row items-center gap-2 w-full md:w-auto">
                     {showImportButton && (
                      <Button onClick={handleImport} disabled={isImporting} variant="outline">
                        {isImporting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <UploadCloud className="mr-2 h-4 w-4" />
                        )}
                        Importar {volunteersToImport.length} Voluntários
                      </Button>
                    )}
                    <div className="relative w-full md:w-64">
                         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                         <Input
                            type="search"
                            placeholder="Buscar voluntário por nome..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleAdd} className="w-full sm:w-auto">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Voluntário
                    </Button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filtrar por Equipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Equipes</SelectItem>
                  {allTeams.map(team => <SelectItem key={team} value={team}>{team}</SelectItem>)}
                </SelectContent>
              </Select>
               <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filtrar por Área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Áreas</SelectItem>
                  {areasOfService.map(area => <SelectItem key={area.name} value={area.name}>{area.name}</SelectItem>)}
                </SelectContent>
              </Select>
               <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filtrar por Disponibilidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Disponibilidades</SelectItem>
                  {availabilityItems.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Equipe</TableHead>
                <TableHead>Áreas de Serviço</TableHead>
                <TableHead>Disponibilidade</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead className="w-20 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8" /></TableCell>
                  </TableRow>
                ))
              ) : filteredVolunteers.length > 0 ? filteredVolunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-auto p-1 text-left font-normal -ml-2">
                          <Badge variant={volunteer.team === 'N/A' ? 'outline' : 'default'} className="cursor-pointer">
                            {volunteer.team}
                          </Badge>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {allTeams.map(teamName => (
                           <DropdownMenuItem 
                              key={teamName} 
                              onClick={() => handleTeamChange(volunteer.id, teamName)}
                              disabled={volunteer.team === teamName}
                            >
                            {teamName}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {volunteer.areas.map(area => <Badge key={area} variant="secondary">{area}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {volunteer.availability.map(avail => <Badge key={avail} variant="outline">{avail}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{volunteer.email}</div>
                      <div>{volunteer.phone}</div>
                    </div>
                  </TableCell>
                   <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(volunteer)}>
                           <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(volunteer)} className="text-destructive">
                           <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhum voluntário encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedVolunteer ? 'Editar Voluntário' : 'Adicionar Novo Voluntário'}</DialogTitle>
            <DialogDescription>Preencha os dados do voluntário.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl><Input placeholder="Nome do voluntário" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="team" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipe</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Selecione uma equipe" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {allTeams.map(team => <SelectItem key={team} value={team}>{team}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="email@exemplo.com" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Celular</FormLabel>
                        <FormControl><Input placeholder="(XX) XXXXX-XXXX" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField control={form.control} name="areas" render={() => (
                    <FormItem>
                        <FormLabel>Áreas de Serviço</FormLabel>
                        <div className="space-y-2 p-2 border rounded-md max-h-40 overflow-y-auto">
                        {areasOfService.map((area) => (
                            <FormField key={area.name} control={form.control} name="areas" render={({ field }) => (
                            <FormItem key={area.name} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                <Checkbox
                                    checked={field.value?.includes(area.name)}
                                    onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...(field.value || []), area.name])
                                        : field.onChange(field.value?.filter((value) => value !== area.name));
                                    }}
                                />
                                </FormControl>
                                <FormLabel className="font-normal">{area.name}</FormLabel>
                            </FormItem>
                            )} />
                        ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="availability" render={() => (
                    <FormItem>
                        <FormLabel>Disponibilidade</FormLabel>
                         <div className="space-y-2 p-2 border rounded-md max-h-40 overflow-y-auto">
                        {availabilityItems.map((item) => (
                             <FormField key={item} control={form.control} name="availability" render={({ field }) => (
                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...(field.value || []), item])
                                        : field.onChange(field.value?.filter((value) => value !== item));
                                    }}
                                />
                                </FormControl>
                                <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                            )} />
                        ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )} />
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="secondary">Cancelar</Button></DialogClose>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente o voluntário.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
