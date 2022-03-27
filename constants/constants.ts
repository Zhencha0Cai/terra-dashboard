export const COINGECKO_URL = "https://api.coingecko.com/api/v3";
export const DEFI_Llama_URL = "https://api.llama.fi";
export const LCD = "https://lcd.terra.dev";
export const FCD = "https://fcd.terra.dev";
export const legendColors = [
  "#CD5C5C",
  "#3498DB",
  "#8E44AD",
  "#F4D03F",
  "#85929E",
];

const knownAddresses = {
  terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6: "Terraform Labs",
  terra1gr0xesnseevzt3h4nxr64sh5gk4dwrwgszx3nw: "Luna Foundation Guard",
  terra10kjnhhsgm4jfakr85673and3aw2y4a03598e0m: "Community Pool Burn",
  terra1wqmfu6w725sal3nvr0ggy49mmtwqgc6tyf4anp: "LUNA Incentives Distribution",
  terra1gawu5a5gmxtfsrkjh034rfy5eclp49seuyxuz8: "Risk Harbor",
  terra1luagdjcr9c9yvp3ak4d7chjm5gldcmgln5rku5: "FTX",
  terra17xpfvakm2amg962yls6f84z3kell8c5lkaeqfa: "Fee Collector (Core)",
  terra1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8pm7utl: "Distribution (Core)",
  terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu: "Burn (Core)",
  terra1ncjg4a59x2pgvqy9qjyqprlj8lrwshm0wleht5: "Binance Deposit",
  terra15s66unmdcpknuxxldd7fsr44skme966tdckq8c: "Binance Withdraw",
  terra18vnrzlzm2c4xfsx382pj2xndqtt00rvhu24sqe: "Binance Withdraw 2",
  terra14l46jrdgdhaw4cejukx50ndp0hss95ekt2kfmw: "Kucoin Deposit",
  terra1rvxcszyfecrt2v3a7md8p30hvu39kj6xf48w9e: "Kucoin Withdraw",
  terra1teescurtylg20tw3fu8cn2p7qe3klpk6f4s9uq: "Huobi",
  terra1ksua3uylq7t46kdumhmepywe8u3nglpku8xsk9: "Bithumb",
  terra1u2ynhr2y9ame80vf5nll0hmqkldkmrrq624r6m: "Coinex",
  terra1u4kjc9nej0ft9wgpl65fpjs2367ku3gh2g9pka: "Moonpay",
  terra1t28h4fg8gjpggvq985d2zz569qj8hpxnsxcx93: "Upbit",
  terra1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4: "Exchange Coinone Deposit",
  terra1al546tmrj0wmwfctcqkch47h57h23mch7d8xqa: "Exchange Coinone Withdraw",
  terra16jpsrgl423fqg6n0e9edllew9z0gm7rhl5300u: "OkCoin",
  terra12gmawj54szkfwx0hhx4dhftpz4mc4z0yg9f3sz: "Newton",
  terra1nm0rrq86ucezaf8uj35pq9fpwr5r82clp5z7r5: "Kraken",
  terra13yxhrk08qvdf5zdc9ss5mwsg5sf7zva9xrgwgc: "Terra Bridge ETH",
  terra1g6llg3zed35nd3mh9zx6n64tfw3z67w2c48tn2: "Terra Bridge BSC",
  terra1rtn03a9l3qsc0a9verxwj00afs93mlm0yr7chk: "Harmony Bridge",
  terra1zxtczmxtw8mk8xncvr8lcq2qmvk4dz88ek6f79: "Angel Protocol Charity",
  terra18kgwjqrm7mcnlzcy7l8h7awnn7fs2pvdl2tpm9:
    "Notorious P.M.9. (TFL Liquidator)",
  terra1dx8p5gkegpcamny5emt0z069cm6ekjuwxhqgdg:
    "Notorious G.D.G. (#2 ANC Liquidator)",
  terra1t7fzgjqeysa8ydhel8tg4kwdx7npcan4we5ygz: "Pylon Pre-Sale Pirate",
  terra1m3tpuzxwjwulzza5vghuqlqx5x27tgmran4ate: "Anchor Instantiator",
  terra19gdee92nnqkc5h7tgyvx3pt2m4phx7qed0plqs: "Anchor Admin",
  terra1gufrav46pnpwf03yu7xz76ylkmatsxtplrxnmc: "Anchor Admin 2",
  terra1zue382qey9l5uhhwcwumjhmsne49a0agwhd60d: "Anchor Price Feeder",
  terra1qye46hulwvl0n2q4us7u69j2emz228jnzswqp0: "Apollo Instantiator",
  terra1c7m6j8ya58a2fkkptn8fgudx8sqjqvc8azq0ex: "MultisigAstroport Multisig",
  terra1jjr7dfgklsg5yxswda5e2xhc4chfqw7svwj3zh: "Pylon Instantiator",
  terra1u9yqqsfz28mk30anxnt4azp87e5r8q8haxvjeh: "Kujira Instantiator",
  terra1w5l9ggryqy8q49pyfl9gqrfwdugynmd09xvwlk: "Orion Instantiator",
  terra1h5tnsa8520qlgg2gp3gw2u46qqtdf0qyhdfvpz: "Spectrum Controller",
  terra1v8l7fjgdut0d3spkzyahqzv5e5crfexz7nu68j: "Spectrum Instantiator",
  terra1th7wznjznnyck42v3eyma6cukqvrttsq75cu5a: "LoTerra Instantiator",
  terra1mxuvsdls2766fskmck0ly04da876sl6n2d0znw: "Mirror Instantiator",
  terra1z2kmp7ed6e6zmqhcj5twx0um9fzk4p3uvuzdmt: "StarTerra Instantiator",
  terra1l4smc62umdn2yjh202m2e8pgas2gx400a0l5hv: "Loop Instantiator",
  terra1etwq0q8wwnmq7322kz4v6ff2dcvwfm634vdkqn: "Loop Treasury",
  terra1vle5gvd8q5l7p6dg6h8y3rygylpnzmwzp0pdu9: "Valkyrie Instantiator",
  terra1s5wkurdh4sw47lgnk5em4h69v5vh9dncmkhyrg: "Nexus Instantiator",
  terra1dfcptsy9x4wzhpv0m79v47ladgj02yyuf0asyu: "Terraworld Instantiator",
  terra1numzqm5mgr56ftd4y8mfen7705nfs4vpz5jf0s:
    "InstantiatorAngel Instantiator",
  terra1rcznds2le2eflj3y4e8ep3e4upvq04sc65wdly: "Angel Protocol Treasury",
  terra1trnahfjgqzfzxv6hpuaradwfwsdjyap74jmsqr: "Playnity Instantiator",
  terra1f0mdzpp5c9yj5tnx2zdrjr68dgstqdyfz4arlz: "Lido Instantiator",
  terra1s5zyrx3knae95xe825dy48kpug50cjk58a8wqn: "Prism Instantiator",
  terra1urgvcdnp9jvqrh8nn7qat5we8pjgtuhgt6a2en: "Prism Forge Receiver",
  terra12n7j0ptzgw0f7scps6x2ul5pkn0crqd7rx8l2g: "TreasuryPrism Treasury",
  terra1djlfl5jxe5pt4hh6dfqw90gtqwq0g0zvuzkjkt: "Proposal 186 Multisig Voter 1",
  terra1zkem239rcs9zeed24nczukkz3zutq0hympd9d8: "Proposal 186 Multisig Voter 2",
  terra1dxka7207kjhxlxvwg4yv32z90h07l03a8jqplv: "Proposal 186 Multisig Voter 3",
  terra15w7ntdhcyfce3twyj5s73gm536q7vn8yf5vp6n: "Momentum Free",
  terra1zu6hjxuaenr5325ldlwwzklftmu06gk6krv2dd: "Tip.CC Bot",
};

export const knownAddressesMap = new Map(Object.entries(knownAddresses));
