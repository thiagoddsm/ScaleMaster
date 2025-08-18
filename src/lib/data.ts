import type { Volunteer, Event, Team, TeamSchedule, AreaOfService } from './types';

export const areasOfService: AreaOfService[] = [
    { "name": "Apoio" },
    { "name": "Bistro" },
    { "name": "Boutique" },
    { "name": "Broadcasting" },
    { "name": "Cleaning" },
    { "name": "Coffee Break" },
    { "name": "Coordenação de culto" },
    { "name": "Coordenação técnica" },
    { "name": "DIS" },
    { "name": "Espaço Vip" },
    { "name": "Estacionamento" },
    { "name": "Fotografia" },
    { "name": "Iluminação" },
    { "name": "Live" },
    { "name": "Musikids" },
    { "name": "Projeção" },
    { "name": "Recepção" },
    { "name": "Saúde" },
    { "name": "Security" },
    { "name": "Som" },
    { "name": "Staff" },
    { "name": "Stories" }
];

export const teams: Team[] = [
  { name: 'Equipe Amarela' },
  { name: 'Equipe Azul' },
  { name: 'Equipe Verde' },
  { name: 'Equipe Vermelha' },
  { name: 'Equipe Alpha' },
  { name: 'Equipe Beta' },
  { name: 'Equipe Gamma' },
  { name: 'Equipe Delta' },
  { name: 'N/A' },
];

export const volunteers: Volunteer[] = [
  {
    "id": "1",
    "name": "ARISLÉDIO FERREIRA DA SILVA",
    "phone": "(21)98104-1093",
    "email": "leo.f.silva48@gmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "2",
    "name": "CARLOS FABRÍCIO LOBO THURLER",
    "phone": "(21)98647-4211",
    "email": "fabriciothurler@gmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "3",
    "name": "CLAUDIO RENATO VEIGA RABELLO",
    "phone": "(21)96989-1357",
    "email": "claurabello22@gmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "4",
    "name": "DEYVSON MACIEL CAETANO",
    "phone": "(21)98299-0572",
    "email": "deyvsonmaciel@yahoo.com.br",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "5",
    "name": "FABIO FERREIRA SOTA",
    "phone": "(21)97005-9442",
    "email": "fabio.brothers2018@gmail.com",
    "areas": [
      "Apoio",
      "Intercessão"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "6",
    "name": "JORGE LUIZ DIAS LISBOA",
    "phone": "(21)99494-2391",
    "email": "jorgeldlisboa@gmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "7",
    "name": "LUCIANO DE PAULA FERNANDES",
    "phone": "(21)97877-8381",
    "email": "lucianofernandes515@gmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "8",
    "name": "LUÍS HENRIQUE ROSA SETIMI",
    "phone": "(21)98215-3948",
    "email": "luisetimi@gmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "9",
    "name": "MARCUS VINICIUS BIGNON DA COSTA",
    "phone": "(21)98618-0228",
    "email": "bignondacosta@hotmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "10",
    "name": "PAULO CEZAR AROUCA BALTHAR",
    "phone": "(21)97976-4499",
    "email": "paulocezarrr97@gmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "11",
    "name": "REGINALDO GOMES PINHEIRO",
    "phone": "(21)98656-2038",
    "email": "reginaldogp46@gmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "12",
    "name": "SALVADOR MOURA LUIZ",
    "phone": "(21)96674-1141",
    "email": "smluiz52@gmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "13",
    "name": "UESLEI MENDONÇA RODRIGUES",
    "phone": "(21)96443-4706",
    "email": "uesleiabc@gmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "14",
    "name": "WELSON  PINHEIRO",
    "phone": "(21)99448-4720",
    "email": "ti_co34@hotmail.com",
    "areas": [
      "Apoio"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "15",
    "name": "ALESSANDRO DE CASTRO CAMPOS",
    "phone": "(21)96467-2779",
    "email": "alecampos0709@gmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "16",
    "name": "ANDRÉ FELIPE DA SILVA",
    "phone": "(21)98235-8612",
    "email": "andrefelipe311713@gmail.com",
    "areas": [
      "Bistro",
      "Espaço Vip"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "17",
    "name": "BEATRIZ ALMEIDA CUNHA BELLOT DE SOUZA",
    "phone": "(21)99515-9274",
    "email": "bebellot13@gmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "18",
    "name": "CLAUDIO ROGERIO INACIO DE FARIAS",
    "phone": "(21)98113-3648",
    "email": "claudio.i.farias@gmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "19",
    "name": "DELCIR VIEIRA DOMINGOS",
    "phone": "(21)98818-7537",
    "email": "delcir.domingos@gmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "20",
    "name": "ELISANGELA PAES CAMPOS",
    "phone": "(21)98020-9483",
    "email": "elisangela.paes0709@gmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "21",
    "name": "FRANCILENE MATIAS DA SILVA PATROCÍNIO",
    "phone": "(21)98134-8993",
    "email": "francipatrocinio@hotmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "22",
    "name": "GIOVANA ROSA DOS SANTOS FREITAS",
    "phone": "(21)99114-8055",
    "email": "giovanarosafreitas@gmail.com",
    "areas": [
      "Bistro",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "23",
    "name": "MARIA CLARA PRADO DE ABREU CÁDIMO",
    "phone": "(21)99520-0434",
    "email": "mariaclarapradoo@hotmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "24",
    "name": "MARIA DA CONCEIÇÃO DA SILVA NEVES CARDOSO",
    "phone": "(21)98410-4329",
    "email": "dedeimaria66@gmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "25",
    "name": "MARIA RITA DE CÁSSIA CALISPTO DA SILVA",
    "phone": "(21)98649-7089",
    "email": "mariaritacalispto@gmail.com",
    "areas": [
      "Bistro",
      "Boutique"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "26",
    "name": "NEVITON FREITAS SIQUEIRA",
    "phone": "(21)98654-3408",
    "email": "nevitonsiqueira@yahoo.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "27",
    "name": "NICOLE BARBOSA MEIRELLES DE SANT'ANNA",
    "phone": "(21)98036-3662",
    "email": "nicolebmeirelles@gmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "28",
    "name": "PEDRO PAULO BRAGA MARINS MIRANDA",
    "phone": "(21)99577-2031",
    "email": "p.marins@hotmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "29",
    "name": "PETER DE SOUZA BORGES",
    "phone": "(21)97034-3054",
    "email": "petersouzaborges@hotmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "30",
    "name": "REGINA DE OLIVEIRA SOUZA DA SILVA",
    "phone": "(21)98886-9796",
    "email": "reginasouzasilva@hotmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "31",
    "name": "ROSANE  SIQUEIRA DE SOUZA",
    "phone": "(21)97863-0007",
    "email": "rosaneelaura10@gmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "32",
    "name": "SIMONE DOS SANTOS SILVA BORGES",
    "phone": "(21)99755-4159",
    "email": "syssyborges1@gmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "33",
    "name": "VILMA GOMES TRINDADE",
    "phone": "(21)97321-6708",
    "email": "gomesvilma444@gmail.com",
    "areas": [
      "Bistro"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "34",
    "name": "ANA ELISA BARBOSA TRINDADE",
    "phone": "(21)98109-6830",
    "email": "anaelisatrin@gmail.com",
    "areas": [
      "Boutique"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "35",
    "name": "BIANCA  MONTEIRO BACELAR LOPES",
    "phone": "(21)99269-1807",
    "email": "biancamblopes@gmail.com",
    "areas": [
      "Boutique"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "36",
    "name": "DANIELLE NUNES SANTOS",
    "phone": "(21)97208-9233",
    "email": "daniellenu85@gmail.com",
    "areas": [
      "Boutique"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "37",
    "name": "ISABELA DOS SANTOS TEIXEIRA BARRETO",
    "phone": "(21)97392-4224",
    "email": "isabelateeixeira@gmail.com",
    "areas": [
      "Boutique"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "38",
    "name": "JOICE LAGÔA DOS SANTOS COSTA",
    "phone": "(21)99590-2998",
    "email": "joicelagoa@yahoo.com.br",
    "areas": [
      "Boutique"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "39",
    "name": "LARISSA DE SOUZA FRANCISCO LOPES",
    "phone": "(21)99992-5497",
    "email": "larissasfbahia@gmail.com",
    "areas": [
      "Boutique"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "40",
    "name": "LÍVIA PEREIRA DOS SANTOS SIMÃO",
    "phone": "(21)99640-0156",
    "email": "liviapssimao@gmail.com",
    "areas": [
      "Boutique"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "41",
    "name": "MARILZA LESSA SIQUEIRA",
    "phone": "(21)98402-8633",
    "email": "marulessa@outlook.com",
    "areas": [
      "Boutique"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "42",
    "name": "SIMONE ANTUNES FERNANDES DE SOUZA",
    "phone": "(21)98484-6991",
    "email": "simoneantunes.fs@gmail.com",
    "areas": [
      "Boutique"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "43",
    "name": "TAMIRES NASCIMENTO DA SILVA",
    "phone": "(21)98253-3871",
    "email": "tamiresnascimentodasilva29@gmail.com",
    "areas": [
      "Boutique"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "44",
    "name": "TAYANE DOS SANTOS TEIXEIRA FONSECA",
    "phone": "(21)99521-9152",
    "email": "tayanedsteixeira@gmail.com",
    "areas": [
      "Boutique"
    ],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "45",
    "name": "BERNARDO LEITE LESSA CAETANO",
    "phone": "(21)99031-9817",
    "email": "bernardollcaetano007@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "46",
    "name": "CAMILLE DIAS QUARESMA",
    "phone": "(21)96957-4709",
    "email": "camilledias8@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "47",
    "name": "DANIEL  PEREIRA SOTA",
    "phone": "(21)97582-7076",
    "email": "dpereirasota@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "48",
    "name": "DAVI NOGUEIRA FERREIRA",
    "phone": "(21)99874-5767",
    "email": "davinog0409@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "49",
    "name": "DAVI PEREIRA SOTA",
    "phone": "(21)97698-8283",
    "email": "",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "50",
    "name": "ELIAS FERNANDES DOS SANTOS FREITAS",
    "phone": "(21)96660-3361",
    "email": "efreitasdg@gmail.com",
    "areas": [
      "Broadcasting",
      "Saúde"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "51",
    "name": "FILIPE DA SILVA NUNES",
    "phone": "(21)97693-1528",
    "email": "ofilipenunes@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "52",
    "name": "FRANCIS FERREIRA VILLAÇA",
    "phone": "(21)98271-3395",
    "email": "francisvillaca.c@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "53",
    "name": "GABRIELA CASTRO NUNES",
    "phone": "(21)97702-8852",
    "email": "hbrielacastro@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "54",
    "name": "JEAN MORAES DA SILVA",
    "phone": "(21)99690-0553",
    "email": "contatojeanmoraes2@gmail.com",
    "areas": [
      "Broadcasting",
      "Professores"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "55",
    "name": "KAROLYNA VITÓRIA FERREIRA NASCIMENTO",
    "phone": "(21)99008-6063",
    "email": "karolynavitoria6@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "56",
    "name": "KEREN SANTOS LEMOS ABDIAS",
    "phone": "(21)98666-9176",
    "email": "keh.cslemos@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "57",
    "name": "MYLLENA SANTIAGO DOS SANTOS",
    "phone": "(21)99828-8871",
    "email": "santiagomyllena@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "58",
    "name": "NICOLAS LAGOA DOS SANTOS COSTA",
    "phone": "(21)97134-5573",
    "email": "duduguittar28@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "59",
    "name": "RODRIGO DE OLIVEIRA MOREIRA RODRIGUES",
    "phone": "(21)99902-8355",
    "email": "rodrigobina22@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "60",
    "name": "RUAN CARLOS TRUGILHO CANDIDO",
    "phone": "(21)98267-3910",
    "email": "pastorruantrugilho@gmail.com",
    "areas": [
      "Broadcasting",
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "61",
    "name": "SAMUEL NICOLAS PAVÃO VIANA DA SILVA",
    "phone": "(21)98212-7087",
    "email": "samuel.nicolasr7@gmail.com",
    "areas": [
      "Broadcasting",
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "62",
    "name": "THUANE BARBOSA LOPES",
    "phone": "(21)97604-9302",
    "email": "thuane.bbs03@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "63",
    "name": "VITÓRIA TAVARES DA COSTA",
    "phone": "(21)96696-2485",
    "email": "vitoriatavaresc16@gmail.com",
    "areas": [
      "Broadcasting"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "64",
    "name": "BRENO MAYRINK NASCIMENTO GUEDES",
    "phone": "(21)97011-5422",
    "email": "brenomayrinkn@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "65",
    "name": "CLAUDIO DA SILVA JUNIOR",
    "phone": "(21)98041-6241",
    "email": "claudio.eng.jr@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "66",
    "name": "DHEMERSON GOMES MARINS",
    "phone": "(21)98678-8956",
    "email": "dhemersongm@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "67",
    "name": "ELIEZER DA SILVA ALMEIDA",
    "phone": "(21)96977-2042",
    "email": "eliezer.almeida@crf-rj.org.br",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "68",
    "name": "ELIZETE AZEVEDO DA SILVA MARTINS",
    "phone": "(21)97179-8359",
    "email": "elizete.dayfels@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "69",
    "name": "GISELLE QUEIRÓZ PONTES",
    "phone": "(21)98782-8469",
    "email": "giselle.qp2012@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "70",
    "name": "GIZELLE CAMPOS DE MESQUITA",
    "phone": "(21)99620-3738",
    "email": "78gmsantos@gmail.com",
    "areas": [
      "Cleaning",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "71",
    "name": "HADASSA RODRIGUES LIMA",
    "phone": "(21)98664-2033",
    "email": "lrhada18@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "72",
    "name": "IRENE GOMES DE CARVALHO DUARTE",
    "phone": "(21)98740-5341",
    "email": "irenegdcd@gmail.com",
    "areas": [
      "Cleaning",
      "Espaço Vip",
      "Intercessão"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "73",
    "name": "ISAIAS DUARTE MESQUITA",
    "phone": "(21)97898-5814",
    "email": "duarrte@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "74",
    "name": "IVONE  MARIA LÚCIO",
    "phone": "(21)99400-6562",
    "email": "ivonelucio21@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "75",
    "name": "JUSSARA DA SILVA CAMPOS",
    "phone": "(21)97252-7822",
    "email": "jussaradasilvacampos@hotmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "76",
    "name": "KATHELYN DINIZ SANTIAGO",
    "phone": "(21)99271-4665",
    "email": "santiagokasantiago@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "77",
    "name": "KATIA  ALMEIDA PINTO",
    "phone": "(21)98559-5725",
    "email": "katia.almeidapinto@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "78",
    "name": "LILIAN COSTA DE ANDRADE LEAL",
    "phone": "(21)96955-0959",
    "email": "liliannutricao@hotmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "79",
    "name": "LUANA MEDEIROS MACIEL",
    "phone": "(21)97974-2295",
    "email": "luanamedeirosdesousa@bom.com.br",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "80",
    "name": "LUZIMERI CRISTINA RODRIGUES FERREIRA MUNIZ",
    "phone": "(21)96482-4745",
    "email": "",
    "areas": [
      "Cleaning",
      "Intercessão",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "81",
    "name": "MARIA REGINA PEREIRA DOS REIS EMERICK",
    "phone": "(21)99388-4976",
    "email": "mreginaemerick@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "82",
    "name": "MÔNICA LACERDA",
    "phone": "(91)98340-1848",
    "email": "monikalacerda21@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "83",
    "name": "PATRÍCIA LÚCIO  DO VALE",
    "phone": "(21)98154-5270",
    "email": "patriciasodre05@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "84",
    "name": "PAULA ALVES MIRANDA",
    "phone": "(21)98208-9326",
    "email": "alvesmirandapaula@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "85",
    "name": "PAULA RAMOS DE ARAUJO DE SOUZA",
    "phone": "(21)98745-5032",
    "email": "paulaaraujosouza7@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "86",
    "name": "SUELI SOLANGE FERREIRA VILLAÇA",
    "phone": "(21)96990-9309",
    "email": "suelisfvillaca@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "87",
    "name": "SUELY COSTA FONSECA",
    "phone": "(21)98698-9410",
    "email": "suelycosta452@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "88",
    "name": "THATIANA ALMEIDA MACIEL",
    "phone": "(21)99336-5017",
    "email": "thatiana.almeida.maciel@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "89",
    "name": "THAYS BATISTA NASCIMENTO",
    "phone": "(21)98705-4845",
    "email": "thaysbatistanascimento658@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "90",
    "name": "VANESSA REIS FIGUEIRA",
    "phone": "(21)97739-3043",
    "email": "vanessarfigueira@gmail.com",
    "areas": [
      "Cleaning",
      "Intercessão"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "91",
    "name": "VÂNIA LÉA SANTOS DIAS",
    "phone": "(21)97747-2852",
    "email": "vanialea343@gmail.com",
    "areas": [
      "Cleaning"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "92",
    "name": "ANA LÚCIA LEMOS FERREIRA",
    "phone": "(21)97473-1872",
    "email": "lemosanalucia116@gmail.com",
    "areas": [
      "Coffee Break"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "93",
    "name": "DAYSE LUCY DA SILVA SOUZA",
    "phone": "(21)99900-0112",
    "email": "dayselsouza@yahoo.com.br",
    "areas": [
      "Coffee Break"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "94",
    "name": "LORENA ROSA DA CONCEIÇÃO MONTEIRO",
    "phone": "(21)98104-5743",
    "email": "lorenarosa72@gmail.com",
    "areas": [
      "Coffee Break"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "95",
    "name": "MARIANGELA PINHEIRO DE CARVALHO COSTA",
    "phone": "(21)99693-9399",
    "email": "mariangelapccosta@gmail.com",
    "areas": [
      "Coffee Break"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "96",
    "name": "MARINA DE CARVALHO COSTA MOURA",
    "phone": "(21)97150-0375",
    "email": "mariccosta99@gmail.com",
    "areas": [
      "Coffee Break"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "97",
    "name": "ROSIANE MOTTA DA SILVA E SILVA",
    "phone": "(21)96762-6766",
    "email": "rosianemottadr@gmail.com",
    "areas": [
      "Coffee Break",
      "Espaço Vip",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "98",
    "name": "TAMIRIS LIMA FIDELIS",
    "phone": "(21)99114-1996",
    "email": "tamirislimafidelis@gmail.com",
    "areas": [
      "Coffee Break"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "99",
    "name": "ERICK DA COSTA MONTEIRO",
    "phone": "(21)99909-0607",
    "email": "erickcostamonteiro@gmail.com",
    "areas": [
      "Coordenação de culto",
      "Professores"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "100",
    "name": "FELIPE SILVA DE OLIVEIRA",
    "phone": "(21)99801-4525",
    "email": "felipe.silva.oliveira@gmail.com",
    "areas": [
      "Coordenação de culto",
      "Espaço Vip",
      "Professores"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "101",
    "name": "FERNANDO SILVA MANFREDI",
    "phone": "(21)96499-2240",
    "email": "fernandodsg@yahoo.com.br",
    "areas": [
      "Coordenação de culto",
      "Espaço Vip"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "102",
    "name": "HEVERSON BERNARDO DE SOUZA",
    "phone": "(21)96465-6672",
    "email": "blax.atos2@gmail.com",
    "areas": [
      "Coordenação de culto",
      "Espaço Vip"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "103",
    "name": "MARCELO  ALEXANDRE MASSOTO DA SILVA",
    "phone": "(21)99425-1689",
    "email": "marcello.massoto@gmail.com",
    "areas": [
      "Coordenação de culto",
      "Espaço Vip"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "104",
    "name": "NEANDER MARINS GUIMARÃES",
    "phone": "(21)96468-5630",
    "email": "neander92@gmail.com",
    "areas": [
      "Coordenação de culto"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "105",
    "name": "ROGÉRIO RIBEIRO FERNANDES",
    "phone": "(21)98530-5547",
    "email": "rogeresmo78@gmail.com",
    "areas": [
      "Coordenação de culto"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "106",
    "name": "THIAGO  LOPES DA SILVA",
    "phone": "(21)99159-1272",
    "email": "lthiago1986@gmail.com",
    "areas": [
      "Coordenação de culto"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "107",
    "name": "ADRIANA MARTINS DOS SANTOS ALMEIDA",
    "phone": "(21)98813-0936",
    "email": "amsa5677@gmail.com",
    "areas": [
      "DIS"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "108",
    "name": "ANA CAROLLINE GOMES DE OLIVEIRA NASCIMENTO",
    "phone": "(21)99430-0547",
    "email": "carol.olvnascimento@gmail.com",
    "areas": [
      "DIS"
    ],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "109",
    "name": "EVANILDA DA SILVA CORREA",
    "phone": "(21)99560-1460",
    "email": "evanildacorrea@hotmail.com",
    "areas": [
      "DIS",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "110",
    "name": "ISABELLA GUINANCIO NASCIMENTO",
    "phone": "(21)99796-1796",
    "email": "isabellaguinancio@id.uff.br",
    "areas": [
      "DIS"
    ],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "111",
    "name": "LEANDRO RIBEIRO NOGUEIRA",
    "phone": "(21)96021-6404",
    "email": "leandrorn.bio@gmail.com",
    "areas": [
      "DIS"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "112",
    "name": "MIRIAM CARRARI DE MATTOS COELHO",
    "phone": "(21)98974-4954",
    "email": "m.carrari@gmail.com",
    "areas": [
      "DIS"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "113",
    "name": "RAQUEL  BOURQUARD CORREIA",
    "phone": "(21)98582-1688",
    "email": "rbourquard@id.uff.br",
    "areas": [
      "DIS",
      "Espaço Vip"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "114",
    "name": "MARCIO DA SILVA ALMEIDA",
    "phone": "(21)99702-1707",
    "email": "madasial@gmail.com",
    "areas": [
      "Eklesia",
      "Espaço Vip",
      "Professores"
    ],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "115",
    "name": "PATRICIA DUTRA NOGUEIRA FERREIRA",
    "phone": "(21)99328-8614",
    "email": "dutra269@gmail.com",
    "areas": [
      "Eklesia",
      "Espaço Vip",
      "Intercessão",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "116",
    "name": "THIAGO DIAS DE SOUZA MOURA",
    "phone": "(21)98900-1302",
    "email": "thiago-ddsm@hotmail.com",
    "areas": [
      "Eklesia",
      "Som"
    ],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "117",
    "name": "ANA  CLAUDIA FERREIRA AMARAL FEITOSA",
    "phone": "(21)98688-2786",
    "email": "ana.feitosa.claudia@outlook.com",
    "areas": [
      "Espaço Vip"
    ],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "118",
    "name": "ANA CAROLINA JANUÁRIO ALVES",
    "phone": "(21)96806-5661",
    "email": "anacbjanuario@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "119",
    "name": "ANA JÚLIA PONTES DA SILVA RIBEIRO",
    "phone": "(21)99764-3990",
    "email": "anajulia200264@hotmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "120",
    "name": "ANA LÚCIA  FERNANDES DE CARVALHO BALTHAR",
    "phone": "(21)97748-7337",
    "email": "kxi1243@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "121",
    "name": "BRUNA CAMACHO LONGOBUCO",
    "phone": "(21)99489-6964",
    "email": "bclongobuco@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "122",
    "name": "CAROLAINE SANTOS MORETSON COUTINHO",
    "phone": "(21)96778-7549",
    "email": "moretsoncarol@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "123",
    "name": "CINTIA MENDES MACEDO RODRIGUES",
    "phone": "(21)97449-2776",
    "email": "cintia.psicopedagoga75@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "124",
    "name": "ESTEPHANY DE OLIVEIRA MONTEIRO",
    "phone": "(21)99025-6833",
    "email": "estephanyo16@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "125",
    "name": "FERNANDA LOPES DOS SANTOS HORSTH",
    "phone": "(21)98427-9493",
    "email": "fehorsth81@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "126",
    "name": "GABRIELE IGNACIO CASTILHO SENA",
    "phone": "(21)97886-3403",
    "email": "gabrielecsena@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "127",
    "name": "GEANE MUNIZ MESQUITA DOMINGOS",
    "phone": "(21)96735-4202",
    "email": "muniz.geane@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "128",
    "name": "GENI PEREIRA DA CRUZ SANTANNA",
    "phone": "",
    "email": "genisantanna65@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "129",
    "name": "JEFFERSON BARROSO JANUÁRIO",
    "phone": "(21)97626-0256",
    "email": "jjanuario@id.uff.br",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "130",
    "name": "JULIA ALVES VAZ DE AQUINO",
    "phone": "(21)96826-2692",
    "email": "vaz.julia@gmail.com",
    "areas": [
      "Musikids"
    ],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "131",
    "name": "LETHICIA CRISTINA MEDEIROS GUIMARÃES GUTIERREZ",
    "phone": "(21)98661-0275",
    "email": "lethiciagutierrez01@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "132",
    "name": "LORENA COSTA BARRETO OLIVEIRA",
    "phone": "(21)99444-0009",
    "email": "oliveira.anuncios123@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "133",
    "name": "ROWENNA E SILVA COUBELLE DE SOUZA",
    "phone": "(21)98622-0472",
    "email": "rowenna_coubelle@hotmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "134",
    "name": "SANDRIELE NEVES CARRARO COSTA",
    "phone": "(21)96565-6795",
    "email": "sandynevescarraro@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "135",
    "name": "SÔNIA MARIA DE OLIVEIRA MONTEIRO",
    "phone": "(21)98659-1264",
    "email": "semmonteiro@hotmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "136",
    "name": "TAÍS SANTOS MORETSON BAPTISTA",
    "phone": "(21)99514-0096",
    "email": "taismoretson@hotmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "137",
    "name": "VITÓRIA MOTTA DA SILVA",
    "phone": "(21)99645-0221",
    "email": "vmottadasilvaa@gmail.com",
    "areas": [],
    "team": "Equipe Amarela",
    "availability": []
  },
  {
    "id": "138",
    "name": "ANA BEATRIZ FERNANDES DE SOUZA",
    "phone": "(21)99966-6129",
    "email": "anabeatrizfdesouza@gmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "139",
    "name": "ANDREZA DUARTE COSTA",
    "phone": "(21)96624-7595",
    "email": "andrezaduarte77@gmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "140",
    "name": "BEATRIZ SOUZA DA SILVA",
    "phone": "(21)98525-8249",
    "email": "bt240596@gmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "141",
    "name": "BIANCA CALISPTO MONTEIRO DA SILVA",
    "phone": "(21)99854-8562",
    "email": "biacalispto@hotmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "142",
    "name": "ELISA OLIVEIRA DA SILVA",
    "phone": "(21)97587-7403",
    "email": "almeida.o.elisa@gmail.com",
    "areas": [
      "Saúde"
    ],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "143",
    "name": "GABRIEL SOUZA ALMADA",
    "phone": "(21)96444-5694",
    "email": "gabrielanjos0107@gmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "144",
    "name": "IASMIN NUNES SALES GUIMARÃES",
    "phone": "(21)96468-5635",
    "email": "iasminnunessales@gmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "145",
    "name": "JOSELI SANTOS DE PAIVA",
    "phone": "(21)98801-8641",
    "email": "josipaiva2013@gmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "146",
    "name": "LARISSE DA SILVA SOUZA",
    "phone": "(21)99362-6362",
    "email": "larissesiso@gmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "147",
    "name": "LETÍCIA BLANCHE DE AMORIM DOMINGOS MIRANDA",
    "phone": "(21)97022-5580",
    "email": "leticiablanche@icloud.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "148",
    "name": "LORENA DA ROCHA BAPTISTA",
    "phone": "(21)98846-3749",
    "email": "lorenarocha301@gmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "149",
    "name": "LUCIA ELENA DA SILVA CAMPANATTI",
    "phone": "(21)98687-5820",
    "email": "luciaederlon@hotmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "150",
    "name": "LYZAMARA NUNES LACERDA DA CONCEIÇÃO",
    "phone": "(21)97951-7118",
    "email": "lyznunes@gmail.com",
    "areas": [
      "Espaço Vip"
    ],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "151",
    "name": "MARIA EDUARDA COSTA DA SILVA",
    "phone": "(21)98774-8106",
    "email": "costadasilvam724@gmail.com",
    "areas": [
      "Saúde"
    ],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "152",
    "name": "MARIA EDUARDA MARINS GONÇALVES",
    "phone": "(21)97007-2530",
    "email": "madumarinsgoncalves@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "153",
    "name": "MONIQUE HARDOIM DOS SANTOS LAGOAS",
    "phone": "(21)97043-1195",
    "email": "moniquehardoim@gmail.com",
    "areas": [
      "Espaço Vip"
    ],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "154",
    "name": "RAIANI DE AZEREDO CASSILHA",
    "phone": "(21)98601-4349",
    "email": "raianiazeredo@gmail.com",
    "areas": [
      "Musikids"
    ],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "155",
    "name": "SARA BEATRIZ ROCHA DE QUEIROZ",
    "phone": "(21)98614-0797",
    "email": "sarabeabeatriz.sb@gmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "156",
    "name": "SHARLONY GOMES CABRAL DO NASCIMENTO",
    "phone": "(21)99558-4912",
    "email": "sharlony.gcn@gmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "157",
    "name": "YOLANDA NICOLE DE OLIVEIRA SOUZA",
    "phone": "(21)99686-7388",
    "email": "nicoleesouzaa1@gmail.com",
    "areas": [],
    "team": "Equipe Azul",
    "availability": []
  },
  {
    "id": "158",
    "name": "ANA BEATRIZ OLIVEIRA LOPES BRAGA",
    "phone": "(21)98988-1954",
    "email": "bragaanabeatriz43@gmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "159",
    "name": "CINTIA ALMEIDA ABREU",
    "phone": "(21)98865-8805",
    "email": "cintiaalmeida@myyahoo.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "160",
    "name": "DANIEL SILVA DOS SANTOS",
    "phone": "(21)99722-2739",
    "email": "dsds.danielsilvadossantos@gmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "161",
    "name": "ERIKA SANTOS COUTO RAINHA",
    "phone": "(21)99351-4706",
    "email": "erika_andrade50@yahoo.com.br",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "162",
    "name": "EVELYN ALVES DE ARAÚJO BASTOS",
    "phone": "(21)98003-1090",
    "email": "evbastos@id.uff.br",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "163",
    "name": "JECIANA BRUM PEREIRA OLIVEIRA",
    "phone": "(21)98815-6567",
    "email": "nanabrum@hotmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "164",
    "name": "KEITI ALMEIDA ARAUJO",
    "phone": "(21)99595-5003",
    "email": "keitialmeidaaraujo@gmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "165",
    "name": "LETICIA VIEIRA DE FARIAS",
    "phone": "(21)99754-2121",
    "email": "leticiaavfarias@gmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "166",
    "name": "MYLLENA DA SILVA TAVARES",
    "phone": "(21)98225-3546",
    "email": "myllena.tavaress@gmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "167",
    "name": "PATRÍCIA DAVIS FERREIRA FREITAS MARQUES",
    "phone": "(21)97361-3550",
    "email": "patriciadfreitas21@gmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "168",
    "name": "RAQUEL RIBEIRO GONCALVES",
    "phone": "(21)96549-5744",
    "email": "raquel.ribeiro93@yahoo.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "169",
    "name": "RAQUEL SOUSA DO ESPÍRITO SANTO",
    "phone": "(21)96921-7260",
    "email": "raquelsousa4r@icloud.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "170",
    "name": "REJANE VIEIRA DE FARIAS",
    "phone": "(21)99754-9905",
    "email": "rejane.v.farias@gmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "171",
    "name": "SAVIA MACHADO SOARES DOS SANTOS",
    "phone": "(21)99555-8684",
    "email": "savinhamsantos@gmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "172",
    "name": "SUELLEN LEAL DO ESPÍRITO SANTO",
    "phone": "(21)96992-1209",
    "email": "susu.leal@hotmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "173",
    "name": "THAISSA MAIA PINTO DE ABREU",
    "phone": "(21)98819-4722",
    "email": "thaissamaia23@gmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "174",
    "name": "VICTOR CASTRO BARROZO",
    "phone": "(21)98570-9715",
    "email": "castrosan94@gmail.com",
    "areas": [],
    "team": "Equipe Verde",
    "availability": []
  },
  {
    "id": "175",
    "name": "AMANDA ASSUMPÇÃO ALBERNAZ",
    "phone": "(21)98865-7710",
    "email": "soparaconcursos10@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "176",
    "name": "AMANDA MELYSSA FREIRE PINTO",
    "phone": "(21)96688-5110",
    "email": "amandinhamelyssa@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "177",
    "name": "ANA CLAUDIA LÁZARO DE SOUZA VERAS",
    "phone": "(21)96418-8743",
    "email": "anaclaudia.lazzaro@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "178",
    "name": "ANA ELÍSIA FERREIRA DA SILVA",
    "phone": "(21)95904-5149",
    "email": "aelisiaf@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "179",
    "name": "ANA KAROLINE LUCAS DUARTE",
    "phone": "(21)99850-1700",
    "email": "anaklucas19@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "180",
    "name": "CINTHIA REIS ALENTEJO",
    "phone": "(21)98821-9478",
    "email": "cinthiaalentejo@hotmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "181",
    "name": "ELIAKIM PEREIRA DA SILVA",
    "phone": "(21)99159-7038",
    "email": "eliakimsilva@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "182",
    "name": "ESTHER ALVES DA SILVA",
    "phone": "(21)97539-8012",
    "email": "alvesesther04@gmail.com",
    "areas": [
      "Som"
    ],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "183",
    "name": "GABRIELLA PEREIRA SANT'ANNA",
    "phone": "(21)99805-2776",
    "email": "gabriellapereira01@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "184",
    "name": "ISABELA ALVES THURLER",
    "phone": "(21)98111-1111",
    "email": "belathurler@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "185",
    "name": "ISABELA SODRÉ CHAME TAVARES DO COUTO",
    "phone": "(21)96556-2840",
    "email": "isabelastavares@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "186",
    "name": "JULIA ARANTES DE OLIVEIRA",
    "phone": "(21)99877-7771",
    "email": "juliaarantesdeoliveira12@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "187",
    "name": "JULIANNA PEREIRA SANT'ANNA",
    "phone": "(21)97206-2322",
    "email": "juliannasantanna.jps@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "188",
    "name": "LETICIA DE MELO FIALHO",
    "phone": "(21)99468-8971",
    "email": "leticiamelofialho@gmail.com",
    "areas": [
      "Espaço Vip"
    ],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "189",
    "name": "LETICIA DE SOUZA CHRISTINO",
    "phone": "(21)98982-9043",
    "email": "leticiachristino21@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "190",
    "name": "LÍVYA OLIVEIRA BARROS CORRÊA",
    "phone": "(21)99801-4521",
    "email": "livyaobcorrea@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "191",
    "name": "MARIA EDUARDA CAMPOS ALBERTINO",
    "phone": "(21)92006-4368",
    "email": "dudacampos_reserva@hotmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "192",
    "name": "NICOLE SILVA BORGES",
    "phone": "(21)97126-3178",
    "email": "nickborges06@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "193",
    "name": "PATRYCIA ANNE GONÇALVES NUNES DE SOUZA DA SILVA",
    "phone": "(21)99161-2928",
    "email": "silvapattyanne@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "194",
    "name": "VANESSA ARAÚJO TEIXEIRA TAVARES",
    "phone": "(21)99436-3458",
    "email": "arateixa@gmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "195",
    "name": "VANESSA PEREIRA RANGEL RAMOS",
    "phone": "(21)99486-8551",
    "email": "rdsramos1@hotmail.com",
    "areas": [],
    "team": "Equipe Vermelha",
    "availability": []
  },
  {
    "id": "196",
    "name": "CARLOS HENRIQUE  LIMA GUEDES",
    "phone": "(21)98540-2263",
    "email": "chlguedes@hotmail.com",
    "areas": [
      "Espaço Vip",
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "197",
    "name": "DOUGLAS  DOS SANTOS DA CONCEIÇÃO",
    "phone": "(21)98097-9351",
    "email": "douglas.da.conceicao@hotmail.com",
    "areas": [
      "Espaço Vip",
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "198",
    "name": "GILLIANE CELIZE DA COSTA RODRIGUES DE MOURA",
    "phone": "(21)98025-0241",
    "email": "gilly.rodrigues@hotmail.com",
    "areas": [
      "Espaço Vip",
      "Intercessão",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "199",
    "name": "HENRIQUE NELAS LONGOBUCO",
    "phone": "(21)98797-2005",
    "email": "longobuco@gmail.com",
    "areas": [
      "Espaço Vip",
      "Musikids",
      "Professores"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "200",
    "name": "JULIANO PORTO LAGOAS",
    "phone": "(21)99856-9691",
    "email": "julianolagoas.ibm@gmail.com",
    "areas": [
      "Espaço Vip",
      "Live",
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "201",
    "name": "KARINE BARROS DE OLIVEIRA",
    "phone": "(21)99801-4529",
    "email": "karineocorrea@gmail.com",
    "areas": [
      "Espaço Vip",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "202",
    "name": "LILIANNY GUIMARÃES MANFREDI",
    "phone": "(21)96485-2756",
    "email": "lilypguimaraes@gmail.com",
    "areas": [
      "Espaço Vip",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "203",
    "name": "LUIZ FELIPE FIGUEIREDO CORREA",
    "phone": "(21)98851-8059",
    "email": "luiz.felipefc@gmail.com",
    "areas": [
      "Espaço Vip"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "204",
    "name": "MARCOS ALEXANDRE DO ESPÍRITO SANTO",
    "phone": "(21)98160-0134",
    "email": "marcos.santo@enel.com",
    "areas": [
      "Espaço Vip",
      "Professores"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "205",
    "name": "RENANN FERNANDES FIALHO",
    "phone": "(21)97032-0547",
    "email": "renannfialho@icloud.com",
    "areas": [
      "Espaço Vip",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "206",
    "name": "THALLYSON FILIPE DE MOURA BATISTA",
    "phone": "(21)97995-5247",
    "email": "thallysonfilipemoura@gmail.com",
    "areas": [
      "Espaço Vip",
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "207",
    "name": "YASMIM SANT'ANNA LIMA",
    "phone": "(21)98445-1779",
    "email": "yasmimsantanna64@gmail.com",
    "areas": [
      "Espaço Vip"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "208",
    "name": "ALEX LOURENÇO MADUREIRA",
    "phone": "(21)99151-8935",
    "email": "alex.madureira@outlook.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "209",
    "name": "CARLOS ANTÔNIO MENDONÇA BORGES JUNIOR",
    "phone": "(21)97508-8386",
    "email": "carlosjunior.cj536@gmail.com",
    "areas": [
      "Estacionamento",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "210",
    "name": "CARLOS MAGNO PACHECO  DOS SANTOS",
    "phone": "(21)99967-7437",
    "email": "magnopacheco47@gmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "211",
    "name": "EUGENIO COSTA CABRAL",
    "phone": "(21)98120-0396",
    "email": "eugeniocostacabral@hotmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "212",
    "name": "EVERSON TRINDADE DOS SANTOS",
    "phone": "(21)98088-6205",
    "email": "eversontrin@gmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "213",
    "name": "FLAVIO TAVARES MARQUES",
    "phone": "(21)98390-8530",
    "email": "flaviomarques1985@gmail.com",
    "areas": [
      "Estacionamento",
      "Security"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "214",
    "name": "FREDERICO FONSECA DA SILVA PINTO",
    "phone": "(21)99937-4663",
    "email": "adm.fred01@gmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "215",
    "name": "GABRIEL PEREIRA DA SILVA",
    "phone": "(21)99356-9988",
    "email": "gpsx.98@gmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "216",
    "name": "JONATAS LUIZ VALADARES LEAL",
    "phone": "(21)99725-2511",
    "email": "jonatas.lealengproducao@gmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "217",
    "name": "JOSÉ FERNANDES ROCHA",
    "phone": "(21)99391-9474",
    "email": "fernandez_be@hotmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "218",
    "name": "LEONARDO RODRIGUES DE MARINS",
    "phone": "(21)98986-5493",
    "email": "leonardo07marins@gmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "219",
    "name": "LEONE CÉSAR DOS SANTOS  OLIVEIRA",
    "phone": "(21)96445-5356",
    "email": "le1oliveira00@gmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "220",
    "name": "MARLON JACKSON DA SILVA BAPTISTA",
    "phone": "(21)97205-7054",
    "email": "marlon2311moretson@hotmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "221",
    "name": "MIGUEL ÂNGELO DO PATROCÍNIO",
    "phone": "(21)98128-6344",
    "email": "mapatrocinio@gmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "222",
    "name": "PEDRO HENRIQUE SOUSA DO COUTO",
    "phone": "(21)98229-0443",
    "email": "phsousacouto@gmail.com",
    "areas": [
      "Estacionamento"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "223",
    "name": "ANA CARLINDA CAMPOS DE SOUZA",
    "phone": "(21)99626-9005",
    "email": "anacarlindacamposde_souza@hotmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "224",
    "name": "ANNA CLARA COUTINHO DA SILVA",
    "phone": "(21)97190-1778",
    "email": "claracout1409@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "225",
    "name": "ASAFE FERREIRA DE MELLO",
    "phone": "(21)96430-8825",
    "email": "asafe_mello@hotmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "226",
    "name": "CAROLINA FARIA GONÇALVES TRUGILHO",
    "phone": "(21)98139-8761",
    "email": "carolinafaria.adv@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "227",
    "name": "CLARA VICTOR FIUZA MOREIRA LIMA",
    "phone": "(21)97604-3849",
    "email": "clarafiuza1@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "228",
    "name": "EDUARDA ARRAIS BARBOSA",
    "phone": "(21)96763-5641",
    "email": "eduardaarraisjobs@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "229",
    "name": "GABRIEL  DOS SANTOS FERNANDES",
    "phone": "(21)99424-0830",
    "email": "feernandesgabriel@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "230",
    "name": "GIOVANNA MENCARI XAVIER",
    "phone": "(21)98723-2851",
    "email": "gimencarix@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "231",
    "name": "GUILHERME ARAÚJO DE OLIVEIRA",
    "phone": "(21)98645-0100",
    "email": "guimoisa12@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "232",
    "name": "ISABELLA  DOS ANJOS AMORIM",
    "phone": "(21)97622-4989",
    "email": "isabelladosanjos08@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "233",
    "name": "JÚLIA CORDEIRO RODRIGUES",
    "phone": "(21)98933-8798",
    "email": "jujubacs2002@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "234",
    "name": "LANA REIS MAIA MACEDO",
    "phone": "(21)98051-6438",
    "email": "lanarmmacedo@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "235",
    "name": "LIZANDRA DE JESUS PEREIRA",
    "phone": "(21)98469-6799",
    "email": "lilibruski@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "236",
    "name": "MARIA EDUARDA ROCHA NUNES",
    "phone": "(21)99173-0654",
    "email": "mariarocr21@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "237",
    "name": "SARA MACHADO DOS SANTOS",
    "phone": "(21)98082-2038",
    "email": "saramsantosprincesa@gmail.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "238",
    "name": "SARAH PEREIRA FREITAS",
    "phone": "",
    "email": "",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "239",
    "name": "SOPHIA ZAINOTTI MONTEIRO",
    "phone": "(21)97558-4604",
    "email": "sosozainottii@icloud.com",
    "areas": [
      "Fotografia"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "240",
    "name": "ALESSANDRO DE SOUZA SILVA",
    "phone": "(21)99162-2979",
    "email": "alessandroitilbr@hotmail.com",
    "areas": [
      "Iluminação"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "241",
    "name": "ANDRÉ LEONI SANTOS DE PAIVA",
    "phone": "(21)98739-6763",
    "email": "dedeleonipaiva@gmail.com",
    "areas": [
      "Iluminação"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "242",
    "name": "CÁSSIO LUIZ MARQUES WELBERT",
    "phone": "(21)99945-1256",
    "email": "potassio.cm@gmail.com",
    "areas": [
      "Iluminação"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "243",
    "name": "EDUARDO DOS SANTOS COSTA",
    "phone": "(21)99894-2998",
    "email": "duduguittar@yahoo.com.br",
    "areas": [
      "Iluminação"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "244",
    "name": "FELIPE MUNIZ DOMINGOS",
    "phone": "(21)98816-3192",
    "email": "felipemunizdomingos@gmail.com",
    "areas": [
      "Iluminação"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "245",
    "name": "JOAO PEDRO FONSECA QUIRINO",
    "phone": "(21)98705-9443",
    "email": "08jpquirino@gmail.com",
    "areas": [
      "Iluminação"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "246",
    "name": "LUCAS PORTO PEREIRA",
    "phone": "(21)99549-9776",
    "email": "lucasportop@gmail.com",
    "areas": [
      "Iluminação"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "247",
    "name": "MARCO ANTÔNIO MENDES DA SILVA",
    "phone": "(21)97523-9150",
    "email": "marcomendessv@gmail.com",
    "areas": [
      "Iluminação"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "248",
    "name": "MARLON CÁDIMO NÓVOA SILVA",
    "phone": "(21)99165-3444",
    "email": "marlon.novoa@hotmail.com",
    "areas": [
      "Iluminação"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "249",
    "name": "PAULO ROBERTO SANTOS DE SOUZA",
    "phone": "(21)98454-2165",
    "email": "paulloroberto87@gmail.com",
    "areas": [
      "Iluminação"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "250",
    "name": "RAMON DA COSTA RODRIGUES",
    "phone": "(21)98698-9041",
    "email": "ramon.rodrigues1467@gmail.com",
    "areas": [
      "Iluminação"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "251",
    "name": "ADRIANA DA SILVA SOUZA DE SÁ",
    "phone": "(21)96448-5279",
    "email": "adrianadesa81@gmail.com",
    "areas": [
      "Intercessão"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "252",
    "name": "ANDERSON DOS SANTOS BATISTA",
    "phone": "(21)97004-6708",
    "email": "andersonbaptista26@hotmail.com",
    "areas": [
      "Intercessão"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "253",
    "name": "CARLA DA SILVA BERRIEL BATISTA",
    "phone": "(21)96489-0808",
    "email": "cbb.berriel@gmail.com",
    "areas": [
      "Intercessão"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "254",
    "name": "CLAUDIA  REGINA DE CARVALHO MONTEIRO BACELAR",
    "phone": "(21)98985-9412",
    "email": "claudiamonteirobacelar@gmail.com",
    "areas": [
      "Intercessão",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "255",
    "name": "FLAVIA VANESSA FIGUEIRA FLORES",
    "phone": "(21)99649-8313",
    "email": "flaviavanessafff@gmail.com",
    "areas": [
      "Intercessão",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "256",
    "name": "IZABELLA TAVARES GONÇALVES SILVA",
    "phone": "(21)98735-9652",
    "email": "izabellatavares48@gmail.com",
    "areas": [
      "Intercessão"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "257",
    "name": "JÉSSIKA RODRIGUES REISHOFFER MUNIZ",
    "phone": "(21)97605-9734",
    "email": "reishoffer.jessika@gmail.com",
    "areas": [
      "Intercessão",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "258",
    "name": "MARIA AUXILIADORA ROCHA FERREIRA CALDAS",
    "phone": "(21)98642-8801",
    "email": "maricaldas79@gmail.com",
    "areas": [
      "Intercessão",
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "259",
    "name": "MATHEUS LUIZ GRAÇA DA SILVA",
    "phone": "(21)98939-7255",
    "email": "mtssilva2324@gmail.com",
    "areas": [
      "Intercessão"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "260",
    "name": "MONICA FONSECA MARTINS",
    "phone": "(21)98836-2274",
    "email": "quirinocbmerj@gmail.com",
    "areas": [
      "Intercessão",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "261",
    "name": "RAILTON SERGIO DE OLIVEIRA FERREIRA",
    "phone": "(21)99322-6754",
    "email": "railtonsergioof@gmail.com",
    "areas": [
      "Intercessão"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "262",
    "name": "VANESSA MESQUITA RANGEL",
    "phone": "(21)97888-3711",
    "email": "vanessammesquita8@gmail.com",
    "areas": [
      "Intercessão",
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "263",
    "name": "ÉDERLON DA SILVA CAMPANATTI",
    "phone": "(21)98939-5820",
    "email": "ederloncampanatti@hotmail.com",
    "areas": [
      "Live",
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "264",
    "name": "JEFFERSON MARINS PINTO",
    "phone": "(21)96409-9334",
    "email": "jeffersonmarins05@gmail.com",
    "areas": [
      "Live"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "265",
    "name": "ANDRESSA SILVEIRA DA CRUZ ROZA",
    "phone": "(21)96815-5025",
    "email": "andressacruz29@gmail.com",
    "areas": [
      "Musikids"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "266",
    "name": "FILIPE ALVES DE SANT'ANNA",
    "phone": "(21)98319-3051",
    "email": "filipeads98@gmail.com",
    "areas": [
      "Musikids",
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "267",
    "name": "ISABELLE  NUNES DA CONCEIÇÃO DE SOUZA",
    "phone": "(21)99222-3133",
    "email": "be_belle@live.com",
    "areas": [
      "Musikids"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "268",
    "name": "IZAAK SALEK DE OLIVEIRA CURY MERLIM",
    "phone": "(21)98198-3033",
    "email": "izaaksalek@gmail.com",
    "areas": [
      "Musikids"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "269",
    "name": "MARCOS JUNIOR ASSUMPÇÃO ALBERNAZ",
    "phone": "(21)97202-5077",
    "email": "assumpmarcosmj@gmail.com",
    "areas": [
      "Musikids"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "270",
    "name": "MAYANA DOS SANTOS BORGES",
    "phone": "(21)97582-7149",
    "email": "mayanaborges2@gmail.com",
    "areas": [
      "Musikids"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "271",
    "name": "PAULA CRISTINA JESUS NUNES DE OLIVEIRA",
    "phone": "(21)96803-1591",
    "email": "paula.nunesoliveira13@gmail.com",
    "areas": [
      "Musikids"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "272",
    "name": "RAPHAEL DA SILVA ROZA",
    "phone": "(21)99450-6143",
    "email": "raphaelzroza@gmail.com",
    "areas": [
      "Musikids",
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "273",
    "name": "SERGIO ROBERTO BARCELLOS DA COSTA FILHO",
    "phone": "(21)97502-1046",
    "email": "sergiobarcellos.filho@gmail.com",
    "areas": [
      "Musikids"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "274",
    "name": "SYLAS VIEIRA BUENO",
    "phone": "(21)97656-0493",
    "email": "sylasvieirab@gmail.com",
    "areas": [
      "Musikids"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "275",
    "name": "THERESA TEMPERINI SOUZA",
    "phone": "(21)98679-6303",
    "email": "tttemperini@gmail.com",
    "areas": [
      "Musikids"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "276",
    "name": "ADRIANO ALCÂNTARA RIBEIRO",
    "phone": "(21)98564-3030",
    "email": "adrianoalcantararibeiro@gmail.com",
    "areas": [
      "Professores",
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "277",
    "name": "MATEUS GUIMARÃES SCHWARTZ FARIA",
    "phone": "(21)96607-7759",
    "email": "mateusg.schwartz@gmail.com",
    "areas": [
      "Professores"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "278",
    "name": "PR. HUGO CAMPOS DE SOUZA",
    "phone": "(21)99524-7838",
    "email": "hugocamposdesouza@hotmail.com",
    "areas": [
      "Professores"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "279",
    "name": "ALEX  LEONI SANTOS DE PAIVA",
    "phone": "(21)98585-7696",
    "email": "alexleonisp23@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "280",
    "name": "ARTHUR MESQUITA DA CRUZ",
    "phone": "(21)99632-8734",
    "email": "artmecruz@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "281",
    "name": "BEATRIZ RODRIGUES MANHÃES MARINS",
    "phone": "(21)97172-7635",
    "email": "beatrizmarins035@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "282",
    "name": "BRUNA DIAS DE SANT’ANNA CORREA",
    "phone": "(21)99334-0114",
    "email": "brunacorrea406@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "283",
    "name": "BRYAN DE CARVALHO SANTORO",
    "phone": "(21)92019-3895",
    "email": "bryansanttoro@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "284",
    "name": "GISELE FONSECA SANTOS ROCHA",
    "phone": "(21)99326-7508",
    "email": "giselesantosfg@hotmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "285",
    "name": "ÍCARO DE PAIVA MAIA FERREIRA",
    "phone": "(21)99847-7393",
    "email": "icaropmf@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "286",
    "name": "JAQUELINE DE OLIVEIRA AZEVEDO",
    "phone": "(21)98061-7052",
    "email": "jaquelineoa@hotmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "287",
    "name": "KAROLINE  MOURA DA SILVA CABRAL",
    "phone": "(21)97254-5773",
    "email": "karolinemoura.s@hotmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "288",
    "name": "LILYAN DECOTHE CAMPANATTI",
    "phone": "(21)96722-3022",
    "email": "lilyancampanatti@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "289",
    "name": "LUCAS LUIZ  CARVALHO MONTEIRO DE ANDRADE",
    "phone": "(21)99029-8379",
    "email": "lucasluizcarvalho33@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "290",
    "name": "RAMON PATRIC DE AZEVEDO SILVA",
    "phone": "(21)96531-3426",
    "email": "rapatric98@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "291",
    "name": "RAQUEL GOMES DE AGUIAR",
    "phone": "(21)97013-9233",
    "email": "raquelgomes.2016.vitor@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "292",
    "name": "RAQUEL GOMES V C DUARTE",
    "phone": "(21)97449-0006",
    "email": "raquelgomesduarte@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "293",
    "name": "SARAH  GONÇALVES MARTINS",
    "phone": "(21)98673-2616",
    "email": "sarahppgon@gmail.com",
    "areas": [
      "Projeção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "294",
    "name": "ADALGIZA PEREIRA DE LIRA",
    "phone": "(21)98954-2700",
    "email": "",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "295",
    "name": "ANA CRISTINA LEAL DOS SANTOS TEIXEIRA",
    "phone": "(21)99966-5813",
    "email": "anacris.leal2@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "296",
    "name": "ANDREA BARBOSA PEREIRA MEIRELLES",
    "phone": "(21)97644-4906",
    "email": "andreameirelllles@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "297",
    "name": "ANDREA CHRISTIANE CAVALCANTI DE GOES",
    "phone": "(21)96449-2328",
    "email": "andreagoes30@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "298",
    "name": "BEATRIZ ABREU DOS SANTOS",
    "phone": "(21)99505-8279",
    "email": "abreubiasantos@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "299",
    "name": "CAROLINE NOGUEIRA DA SILVA",
    "phone": "(22)96444-0087",
    "email": "cns.nogueira87@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "300",
    "name": "CÍNTIA  DOS ANJOS MOURA AMORIM",
    "phone": "",
    "email": "cintiaanjos.amorim@hotmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "301",
    "name": "CINTIA GOMES DE SOUZA SOARES",
    "phone": "(21)97285-9913",
    "email": "cintia.gsoares09@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "302",
    "name": "CLEIDE FERREIRA DA COSTA MONTEIRO",
    "phone": "(21)98479-2451",
    "email": "",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "303",
    "name": "DANIELE DA SILVA PEREIRA SOTA",
    "phone": "(21)99250-0763",
    "email": "daniellecasal@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "304",
    "name": "DEUSILEA COSTA",
    "phone": "(21)99626-6799",
    "email": "deusileacosta2015@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "305",
    "name": "EDILMA  DA SILVA TOMAZ",
    "phone": "(21)98156-7344",
    "email": "edilmatomaz14@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "306",
    "name": "EDNA DA SILVA TEIXEIRA",
    "phone": "(22)98852-3117",
    "email": "ednasteixeiraa@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "307",
    "name": "ELAINE PEREIRA DA SILVA MADUREIRA",
    "phone": "(21)99255-8165",
    "email": "nannyalegria2012@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "308",
    "name": "ELISA ALVES THURLER",
    "phone": "(21)98928-4262",
    "email": "elisathurler@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "309",
    "name": "ELIZANGELA BRUSKI DE JESUS",
    "phone": "(21)98775-2282",
    "email": "corujinha25@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "310",
    "name": "EVANILDE MELO DE SOUZA SILVA",
    "phone": "(21)98779-5577",
    "email": "evanildemssilva@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "311",
    "name": "FABIANE PORTO MOURA DE SOUZA",
    "phone": "(21)96406-1840",
    "email": "biane07@hotmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "312",
    "name": "FRANCINE ALMEIDA LIBORIO DE ARAUJO",
    "phone": "(21)97908-7276",
    "email": "francinealmeida80@yahoo.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "313",
    "name": "GABRIEL DA SILVA GONÇALVES",
    "phone": "",
    "email": "gabrielsilvagoncalves590@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "314",
    "name": "GABRIELA PIRES MARINS DE OLIVEIRA",
    "phone": "(21)98952-4297",
    "email": "gabi.pmdo@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "315",
    "name": "GABRIELLA DA SILVA NUNES",
    "phone": "(21)96636-9642",
    "email": "ggabinunes35@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "316",
    "name": "HIAGO CAMPOS MARENDINO",
    "phone": "(21)96522-7053",
    "email": "hiagocampos84@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "317",
    "name": "JAININE GOMES PEREIRA",
    "phone": "(21)97374-8551",
    "email": "jaininegomes@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "318",
    "name": "JOICE PEREIRA DUARTE",
    "phone": "(21)99989-8215",
    "email": "joice_duarte007@hotmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "319",
    "name": "JOSIAS LEONARDO DIAS",
    "phone": "(21)96558-7555",
    "email": "josiasleonardo2@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "320",
    "name": "JULIANA DA COSTA SANTOS DE SOUZA",
    "phone": "(21)96599-5175",
    "email": "juliana.costasantos@yahoo.com.br",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "321",
    "name": "JULIANA LESSA RODRIGUES",
    "phone": "(21)96763-8377",
    "email": "lessajuliana312@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "322",
    "name": "KAREM CRISTINA LIMA GUEDES DOS REIS SILVA",
    "phone": "(21)99388-9100",
    "email": "karenguedes97@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "323",
    "name": "KELLY MONTEIRO SILVA NOGUEIRA",
    "phone": "(21)99420-1799",
    "email": "kellymonts@hotmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "324",
    "name": "LAHIZ BORGES GUIMARÃES",
    "phone": "(21)98020-0720",
    "email": "lahizborges@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "325",
    "name": "LILIA DA SILVA FREITAS",
    "phone": "(21)99437-0182",
    "email": "liliarochadasilva3@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "326",
    "name": "LOYDE SHAYLANE  MOREIRA GUEDES",
    "phone": "(21)97538-3055",
    "email": "lsmguedes@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "327",
    "name": "LUCIANA PECLAT GONÇALVES",
    "phone": "(21)98537-2241",
    "email": "peclatlucianapeclat@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "328",
    "name": "MARIA DAS GRAÇAS PEREIRA DINIZ",
    "phone": "(21)96884-9797",
    "email": "marygracy.diniz@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "329",
    "name": "MARIA DO CARMO DA SILVA",
    "phone": "(21)98756-8280",
    "email": "carmosilva2165@hotmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "330",
    "name": "MARIA EDUARDA LIMA DE FARIAS",
    "phone": "(21)97414-7562",
    "email": "mariaeduardalimadefarias5@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "331",
    "name": "MYLENA FERREIRA MACHADO",
    "phone": "(21)97267-9469",
    "email": "mylenaferreira0502@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "332",
    "name": "NATALIA BRAGA RODRIGUES",
    "phone": "(21)97028-8111",
    "email": "nataliadvogada01@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "333",
    "name": "NATHALIA LUZIA DE SOUSA SILVA CORRÊA",
    "phone": "(21)98158-6266",
    "email": "nathalia.turbotruck@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "334",
    "name": "NEIDE APARECIDA DA CONCEIÇÃO",
    "phone": "(21)99955-2713",
    "email": "neydeconceicao5514@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "335",
    "name": "RAFFAEL DA SILVA RAINHA",
    "phone": "(21)99324-4404",
    "email": "raffaelrainha@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "336",
    "name": "REGIA MARIA HOLANDA OLIVEIRA",
    "phone": "(21)96861-9586",
    "email": "regia_oliveira@hotmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "337",
    "name": "REGINA CÉLIA EVANGELISTA NOGUEIRA DA SILVA",
    "phone": "(21)96472-8132",
    "email": "alinepedrogiovani@hotmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "338",
    "name": "RITA DE CASSIA RIBEIRO DOS SANTOS",
    "phone": "(21)99132-4778",
    "email": "ritafgsantos346@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "339",
    "name": "RODRIGO DUARTE PINTO GOMES",
    "phone": "(21)98766-5007",
    "email": "rodrigojnsse@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "340",
    "name": "SANDRA REGINA BARBOSA TAVARES MASSOTO",
    "phone": "(21)98849-0333",
    "email": "sandra.massoto@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "341",
    "name": "SELMA IGNACIO CASTILHO SENA",
    "phone": "(21)96403-9556",
    "email": "selmaignaciosena@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "342",
    "name": "SHEILA CRISTINA FERMIANO MONTEIRO PINHEIRO",
    "phone": "(21)98836-9883",
    "email": "boutiquedabeleza44@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "343",
    "name": "SUELLEN CALISPTO MONTEIRO DA SILVA",
    "phone": "(21)97368-4801",
    "email": "suellencalispto@yahoo.com.br",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "344",
    "name": "SUSANE BATISTA ALVES THURLER",
    "phone": "(21)98928-4264",
    "email": "susithurler@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "345",
    "name": "TAYS SANTOS TAMANDARE",
    "phone": "(21)99709-1510",
    "email": "tays.tamandare04@yahoo.com.br",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "346",
    "name": "THUAN DE LIMA SILVA",
    "phone": "(21)98274-9759",
    "email": "thuanlima3@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "347",
    "name": "VANESSA  OLIVEIRA LOPES",
    "phone": "(21)98612-7801",
    "email": "vanessalopesrj@hotmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "348",
    "name": "VERONICA DE OLIVEIRA FIRMINO DE SOUZA",
    "phone": "(21)98705-3604",
    "email": "veronicaoliveira2003@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "349",
    "name": "YASMIM CALAZANS PEREIRA DE QUEIROZ",
    "phone": "(21)97751-1689",
    "email": "ycalazanspereira@gmail.com",
    "areas": [
      "Recepção"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "350",
    "name": "CYNTIA HAASE PUPO",
    "phone": "(21)99592-6236",
    "email": "cyntia_haase@hotmail.com",
    "areas": [
      "Saúde"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "351",
    "name": "JORGE RENATO CRUZ DA MATTA",
    "phone": "(21)97608-1478",
    "email": "renatongage@gmail.com",
    "areas": [
      "Saúde"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "352",
    "name": "LEONAM JALOTO AGUIAR COSTA",
    "phone": "(21)99978-4355",
    "email": "leonam.costa21@gmail.com",
    "areas": [
      "Saúde"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "353",
    "name": "QUEILA DE MELLO GAUTER",
    "phone": "(21)99780-4063",
    "email": "queilagaute@gmail.com",
    "areas": [
      "Saúde"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "354",
    "name": "ANDERSON FELIPE CAMINHA",
    "phone": "(21)98500-5129",
    "email": "acaminha31@gmail.com",
    "areas": [
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "355",
    "name": "ARTHUR VICTOR DE OLIVEIRA SILVA",
    "phone": "(21)99431-1438",
    "email": "victorroot20@gmail.com",
    "areas": [
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "356",
    "name": "CLINTON TAVARES BARRETO",
    "phone": "(21)97036-8150",
    "email": "clinton.tecnocon@gmail.com",
    "areas": [
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "357",
    "name": "DANIEL VELOSO LOPES",
    "phone": "(21)99470-5758",
    "email": "danielvelosolopes@hotmail.com",
    "areas": [
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "358",
    "name": "LUCAS CUNHA DA SILVA",
    "phone": "(21)97898-4483",
    "email": "lc95.abuh@gmail.com",
    "areas": [
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "359",
    "name": "LUCAS MUNIZ DOMINGOS",
    "phone": "(21)98562-0562",
    "email": "muniz.lucasmuniz03@gmail.com",
    "areas": [
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "360",
    "name": "MARCELO DANIEL DA SILVA CARNEIRO",
    "phone": "(21)99984-3328",
    "email": "marcelodaniel033@gmail.com",
    "areas": [
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "361",
    "name": "RAMON ABDIAS",
    "phone": "(21)98288-1930",
    "email": "ramon.abdias@gmail.com",
    "areas": [
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "362",
    "name": "SÉRGIO RICARDO COUTO FILHO",
    "phone": "(21)99196-7132",
    "email": "sricardocouto@yahoo.com.br",
    "areas": [
      "Som"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "363",
    "name": "ALEX DA SILVA CALDAS",
    "phone": "(21)98769-7374",
    "email": "ascaldas.silva@gmail.com",
    "areas": [
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "364",
    "name": "ANDERSON RIBEIRO DA SILVA",
    "phone": "(21)99472-2481",
    "email": "ars231075@gmail.com",
    "areas": [
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "365",
    "name": "EVELYN LORENA DE CARVALHO CAMILO",
    "phone": "(21)99654-7302",
    "email": "evelynccamilo@icloud.com",
    "areas": [
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "366",
    "name": "GABRIEL ELIAS DE SOUZA SIDACO ROSA",
    "phone": "(21)98557-5755",
    "email": "gabriel-sidaco@hotmail.com",
    "areas": [
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "367",
    "name": "GILSON MONTEIRO DE CARVALHO HORSTH",
    "phone": "(21)98782-4362",
    "email": "gilsonhorsth@gmail.com",
    "areas": [
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "368",
    "name": "MARCELLO VINHAS VERÇULINO",
    "phone": "(21)99141-8686",
    "email": "marcello.vinas.40@gmail.com",
    "areas": [
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "369",
    "name": "RAPHAEL FERNANDO GOULART DA SILVA",
    "phone": "(21)97575-9386",
    "email": "ralphgoulart@outlook.com",
    "areas": [
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "370",
    "name": "RENAN DE CARVALHO COSTA",
    "phone": "(21)97217-1582",
    "email": "renancarvalhoc06@gmail.com",
    "areas": [
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "371",
    "name": "RONALD  TORRES CABRAL",
    "phone": "(21)98367-8570",
    "email": "ronaldcabral95@gmail.com",
    "areas": [
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "372",
    "name": "RULIAN NASCIMENTO MONTEIRO",
    "phone": "(21)99586-6893",
    "email": "rulinascimento@hotmail.com",
    "areas": [
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "373",
    "name": "WILSON MICHAEL GOUDARD MONTEIRO",
    "phone": "(21)98581-3881",
    "email": "michaelgoudard@outlook.com",
    "areas": [
      "Staff"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "374",
    "name": "BRUNA DO NASCIMENTO RIBEIRO",
    "phone": "(21)98472-4096",
    "email": "inf.brunaribeiro@gmail.com",
    "areas": [
      "Stories"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "375",
    "name": "DAVID OLIVEIRA DE MORAES",
    "phone": "(21)97385-8704",
    "email": "davidmoraes7210@gmail.com",
    "areas": [
      "Stories"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "376",
    "name": "EVELLYN NUNES TAVEIRA PORTO",
    "phone": "(21)99679-2688",
    "email": "evellynnt@gmail.com",
    "areas": [
      "Stories"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "377",
    "name": "GIULIA ACZA MOREIRA GUEDES",
    "phone": "(21)95902-7368",
    "email": "guedesgiulia11@gmail.com",
    "areas": [
      "Stories"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "378",
    "name": "MARILIA ROCHA",
    "phone": "(21)97581-0155",
    "email": "mariliarfp@gmail.com",
    "areas": [
      "Stories"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "379",
    "name": "PRISCYLLA VITORIA OLIVEIRA DE MORAES DO NASCIMENTO",
    "phone": "(21)99199-5547",
    "email": "vitoria_pri@hotmail.com",
    "areas": [
      "Stories"
    ],
    "team": "N/A",
    "availability": []
  },
  {
    "id": "380",
    "name": "THIAGO PEREIRA DA SILVA CHAVES",
    "phone": "(21)99896-6829",
    "email": "thiagoperreira9@gmail.com",
    "areas": [
      "Stories"
    ],
    "team": "N/A",
    "availability": []
  }
];

export const events: Event[] = [
  {
    id: '1',
    name: 'Culto de Domingo',
    frequency: 'Semanal',
    dayOfWeek: 'Domingo',
    time: '10:00',
    areas: ['Som', 'Projeção', 'Iluminação', 'Broadcasting', 'Recepção', 'Musikids', 'Security', 'Saúde'],
    responsible: 'Pastor Jonas',
  },
  {
    id: '2',
    name: 'Culto de Quarta',
    frequency: 'Semanal',
    dayOfWeek: 'Quarta-feira',
    time: '20:00',
    areas: ['Som', 'Projeção', 'Recepção'],
    responsible: 'Pastor Lucas',
  },
  {
    id: '3',
    name: 'Vigília',
    frequency: 'Pontual',
    date: '2024-07-26',
    time: '22:00',
    areas: ['Som', 'Iluminação', 'Cleaning'],
    responsible: 'Líder de Oração',
  },
    {
    id: '4',
    name: 'Culto da Família',
    frequency: 'Pontual',
    date: '2024-08-11',
    time: '18:00',
    areas: ['Som', 'Projeção', 'Iluminação', 'Broadcasting', 'Recepção', 'Musikids', 'Cleaning', 'Fotografia'],
    responsible: 'Pastor Jonas',
    observations: 'Evento especial de dia dos pais'
  },
];

export const teamSchedules: TeamSchedule[] = [
    { team: 'Equipe Alpha', startDate: '2024-07-01', endDate: '2024-07-07'},
    { team: 'Equipe Beta', startDate: '2024-07-08', endDate: '2024-07-14'},
    { team: 'Equipe Gamma', startDate: '2024-07-15', endDate: '2024-07-21'},
    { team: 'Equipe Delta', startDate: '2024-07-22', endDate: '2024-07-28'},
    { team: 'Equipe Alpha', startDate: '2024-07-29', endDate: '2024-08-04'},
    { team: 'Equipe Beta', startDate: '2024-08-05', endDate: '2024-08-11'},
    { team: 'Equipe Gamma', startDate: '2024-08-12', endDate: '2024-08-18'},
    { team: 'Equipe Delta', startDate: '2024-08-19', endDate: '2024-08-25'},
    { team: 'Equipe Amarela', startDate: '2024-09-02', endDate: '2024-09-08'},
    { team: 'Equipe Azul', startDate: '2024-09-09', endDate: '2024-09-15'},
    { team: 'Equipe Verde', startDate: '2024-09-16', endDate: '2024-09-22'},
    { team: 'Equipe Vermelha', startDate: '2024-09-23', endDate: '2024-09-29'},
];
