import { useState, useRef, useCallback, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── PASTE YOUR SUPABASE CREDENTIALS HERE ───────────────────────────────────
const SUPABASE_URL = "myhue-git-main-nikitaworkneh-2324s-projects.vercel.app";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0dmR4bnF1YndybG9zbmtmdHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2OTQxMTIsImV4cCI6MjA5NDI3MDExMn0.U8BujYy5-dAYTsvLmtx9geCbBfYpl2s_x2wWMeypWNw";
// ────────────────────────────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

var P={
  bs:{s:"Spring",n:"Bright Spring",e:"🌺",d:"Brightness",d2:"Warmth",mu:"H:Med-warm V:Med C:High",fl:"Bright Winter and True Spring",si:["bw","ts"],
    desc:"The most vivid Spring. Maximum clarity and saturation — muted or greyed colours look dull against you.",
    sk:"Clear warm-neutral — luminous ivory, light golden, warm beige.",ey:"Vivid blue, bright green, bright hazel, turquoise.",ha:"Golden brown, auburn, copper, dark blonde with golden highlights.",
    c:["#E04030","#F06830","#F5B800","#E8D840","#40B868","#00A088","#0098C0","#3872B0","#7850A0","#D84890","#F05878","#F0A098"],
    cn:["Flame Red","Tangerine","Sunflower","Citrine","Spring Green","Jade","Cerulean","Cobalt","Amethyst","Fuchsia","Coral Pink","Salmon"],
    ic:null,ne:["#383838","#586050","#887868","#C0B8A0","#E8E0D0","#F5F0E8"],mt:"Bright yellow gold, polished rose gold",
    av:"Dusty, muted, greyed tones.",ac:["#B8A0A0","#8A7E6B","#7A8060","#A898B0"],al:["Dusty rose","Mushroom","Muted olive","Greyed mauve"],
    mk:"Bright coral blush, clear warm red lip, warm bronze eye",
    pt:{b:"Vivid tropical prints, bold geometrics",m:"Clear abstract prints, colourful stripes",d:"Small vivid prints, petite saturated florals"}},
  ts:{s:"Spring",n:"True Spring",e:"🌻",d:"Warmth",d2:"Brightness",mu:"H:Warm V:Med C:Med-high",fl:"Bright Spring and Light Spring",si:["bs","ls"],
    desc:"The warmest Spring — golden, sunny, fresh. Rich rather than pastel.",
    sk:"Distinctly warm — golden, peachy, warm ivory.",ey:"Golden brown, warm hazel, green with golden flecks, amber.",ha:"Strawberry blonde, golden blonde, honey brown, copper.",
    c:["#C84838","#E07040","#E8A028","#E0C840","#48A850","#28A098","#48B0A8","#2898A8","#C86098","#D88060","#D8A860","#88B858"],
    cn:["Tomato Red","Burnt Orange","Marigold","Buttercup","Leaf Green","Teal","Aqua","Ocean","Orchid","Terracotta","Honey","Apple"],
    ic:null,ne:["#483020","#685040","#988060","#C8B898","#E8DCC8","#F8F2E8"],mt:"Rich yellow gold, warm brass, antique gold",
    av:"Cool blues, icy pastels, silver.",ac:["#A0C8E0","#C0C0C8","#D030A0","#B02048"],al:["Icy blue","Cool grey","Magenta","Blue-red"],
    mk:"Warm peach blush, salmon or coral lip, golden bronze eye",
    pt:{b:"Warm bold florals, large paisley",m:"Busy creative prints, warm dots",d:"Small warm florals, fine stripes"}},
  ls:{s:"Spring",n:"Light Spring",e:"🌸",d:"Lightness",d2:"Warmth",mu:"H:Med-warm V:Light C:Med",fl:"True Spring and Light Summer",si:["ts","lsu"],
    desc:"The most delicate Spring — light, fresh, gently warm. No black, no stark white.",
    sk:"Light warm-neutral — light ivory, peachy fair.",ey:"Light blue, light green, light warm hazel, soft golden brown.",ha:"Light golden blonde, warm light brown, strawberry blonde.",
    c:["#E89088","#F0A880","#E8C070","#E8E0A0","#80C8A0","#68BEB0","#80B8C8","#90A8C8","#C098C0","#F0B0B8","#F0C890","#A8D098"],
    cn:["Rose","Apricot","Chamomile","Primrose","Mint","Seafoam","Powder Blue","Periwinkle","Wisteria","Blush","Peach","Pistachio"],
    ic:null,ne:["#706858","#8C8070","#A89888","#D0C8B8","#E8E4D8","#FAF6F0"],mt:"Light gold, champagne, soft rose gold",
    av:"Dark heavy colours. Black. Cool icy tones.",ac:["#000000","#404040","#0050E0","#780828"],al:["Black","Charcoal","Electric blue","Burgundy"],
    mk:"Soft peach blush, pink nude lip, champagne eye",
    pt:{b:"Large watercolour florals",m:"Medium light florals, soft abstracts",d:"Fine ditsy florals — your best scale"}},
  lsu:{s:"Summer",n:"Light Summer",e:"🦋",d:"Lightness",d2:"Coolness",mu:"H:Med-cool V:Light C:Med",fl:"Light Spring and True Summer",si:["ls","tsu"],
    desc:"The brightest Summer — light, airy, cool. Powder pastels and gentle cool tones.",
    sk:"Light cool-neutral — porcelain, cool fair.",ey:"Soft blue, grey-blue, light cool green.",ha:"Ash blonde, cool light brown, mousy brown.",
    c:["#D08898","#CC8888","#D8B888","#C8C898","#88B898","#78B0B8","#88A8C8","#9898C0","#B890C0","#E0A0A8","#98C0B0","#B8B8D0"],
    cn:["Dusty Rose","Rosewood","Wheat","Sage","Sea Glass","Steel Blue","Cornflower","Lavender","Mauve","Pink Sand","Celadon","Lilac"],
    ic:null,ne:["#606870","#788090","#98A0A8","#C0C0C8","#E0DDE0","#F5F2F2"],mt:"White gold, platinum, soft silver",
    av:"Warm earthy tones, gold, camel, rust.",ac:["#C06828","#D4A520","#E06020","#506828"],al:["Rust","Gold","Orange","Dark olive"],
    mk:"Cool pink blush, rose pink lip, cool lavender eye",
    pt:{b:"Large soft cool florals",m:"Medium watercolour patterns",d:"Fine cool florals, small patterns"}},
  tsu:{s:"Summer",n:"True Summer",e:"🌊",d:"Coolness",d2:"Mutedness",mu:"H:Cool V:Med C:Med",fl:"Light Summer and Soft Summer",si:["lsu","ssu"],
    desc:"The coolest Summer — roses, slate blues, periwinkle, cool berries.",
    sk:"Cool — cool beige, pink-neutral fair, cool rose.",ey:"Blue-grey, soft cool blue, cool green.",ha:"Ash brown, medium cool brown, mousy brown.",
    c:["#B05070","#B87088","#A89878","#8CA080","#609088","#5890A0","#5878A8","#6868A8","#906898","#C88888","#6898A0","#8888B0"],
    cn:["Raspberry","Dusky Pink","Khaki","Olive Sage","Eucalyptus","Slate Teal","Denim","Indigo","Plum","Old Rose","Verdigris","Storm Blue"],
    ic:null,ne:["#484858","#606068","#808088","#A8A8B0","#D0D0D4","#ECEAEC"],mt:"Silver, white gold, pewter",
    av:"Golden yellows, warm oranges, earthy browns.",ac:["#E8C020","#E87030","#B89060","#C04020"],al:["Golden yellow","Orange","Warm camel","Rust"],
    mk:"Cool rose blush, mauve or plum lip, smoky blue-grey eye",
    pt:{b:"Large cool florals, bold cool abstract",m:"Medium cool prints, soft geometrics",d:"Fine cool florals, tone-on-tone"}},
  ssu:{s:"Summer",n:"Soft Summer",e:"🌫️",d:"Mutedness",d2:"Coolness",mu:"H:Med-cool V:Med C:Low",fl:"True Summer and Soft Autumn",si:["tsu","sa"],
    desc:"The most muted cool season. Gently greyed, low-contrast, dusty and understated.",
    sk:"Neutral-cool — muted beige, cool-neutral, olive-grey.",ey:"Grey-green, grey-blue, soft hazel.",ha:"Ash brown, mousy brown, cool medium brown.",
    c:["#A08080","#A08888","#A0A088","#90A088","#709888","#789090","#788098","#8880A0","#988890","#B09898","#789898","#908C90"],
    cn:["Cocoa Rose","Ash Rose","Stone","Lichen","Muted Teal","Pewter","Slate","Heather","Mauve Taupe","Dusty Pink","Sage Grey","Pebble"],
    ic:null,ne:["#505050","#686860","#888880","#A8A498","#C8C4B8","#E8E4DC"],mt:"Brushed silver, matte pewter",
    av:"Bright, vivid, neon colours. Pure black and white.",ac:["#E02020","#0060F0","#FF40A0","#F0E000"],al:["Bright red","Electric blue","Neon pink","Vivid yellow"],
    mk:"Dusty rose blush, muted mauve lip, soft grey-green eye",
    pt:{b:"Large muted tone-on-tone",m:"Blended watercolour, soft plaid",d:"Tone-on-tone textures, subtle prints"}},
  sa:{s:"Autumn",n:"Soft Autumn",e:"🌾",d:"Mutedness",d2:"Warmth",mu:"H:Med-warm V:Med C:Low",fl:"Soft Summer and True Autumn",si:["ssu","ta"],
    desc:"The most muted warm palette. Warm but gently greyed — nuts, rose, wheat, sage.",
    sk:"Warm-neutral, muted — warm beige, golden-grey.",ey:"Warm hazel, soft green, olive.",ha:"Mousy brown with golden tones, warm ash brown.",
    c:["#B08068","#A88878","#B8A870","#A0A078","#80987C","#789088","#788898","#8888A0","#98808C","#C09888","#8FA080","#A89888"],
    cn:["Clay","Driftwood","Oat","Moss","Sage","Eucalyptus","Dusty Blue","Muted Lilac","Rose Taupe","Sandstone","Fern","Pebble"],
    ic:null,ne:["#484038","#5E5048","#807060","#A89888","#C8C0B0","#E8E0D4"],mt:"Antique gold, matte brass, brushed rose gold",
    av:"Bright, vivid colours. Icy tones. Black/white.",ac:["#D020A0","#1858D0","#00D848","#C0C8F0"],al:["Fuchsia","Cobalt","Electric green","Icy lavender"],
    mk:"Soft terracotta blush, warm nude lip, matte taupe eye",
    pt:{b:"Large muted warm florals",m:"Soft warm plaid, muted earth prints",d:"Fine muted warm florals, subtle textures"}},
  ta:{s:"Autumn",n:"True Autumn",e:"🍂",d:"Warmth",d2:"Mutedness",mu:"H:Warm V:Med C:Med",fl:"Soft Autumn and Dark Autumn",si:["sa","da"],
    desc:"The quintessential Autumn. Deeply warm — rich rather than bright. Earthy, organic.",
    sk:"Distinctly warm — golden, warm olive, warm bronze.",ey:"Warm brown, dark hazel, olive green, amber.",ha:"Auburn, copper, warm dark brown, chestnut.",
    c:["#B84830","#C07838","#C89828","#9C9840","#588C50","#3A7868","#307890","#506898","#886098","#C06858","#807840","#B88840"],
    cn:["Paprika","Pumpkin","Mustard","Olive","Forest","Spruce","Petrol","Dusk Blue","Aubergine","Sienna","Bronze","Amber"],
    ic:null,ne:["#382818","#503820","#786040","#A89068","#C8B898","#ECE0C8"],mt:"Rich yellow gold, bronze, warm copper",
    av:"Cool pastels, icy blues, fuchsia, silver.",ac:["#F0C8D0","#A0A8B0","#C8D8F0","#D830A0"],al:["Icy pink","Cool grey","Powder blue","Fuchsia"],
    mk:"Terracotta blush, warm brick lip, bronze eye",
    pt:{b:"Rich warm florals, large ethnic prints",m:"Autumn-toned medium florals",d:"Small warm ditsy prints, fine plaid"}},
  da:{s:"Autumn",n:"Dark Autumn",e:"🌰",d:"Depth",d2:"Warmth",mu:"H:Med-warm V:Dark C:Med-high",fl:"True Autumn and Dark Winter",si:["ta","dw"],
    desc:"The deepest Autumn — warmth meets depth. Deep spice tones. Includes icies.",
    sk:"Warm-neutral with depth — olive, warm brown, deep golden.",ey:"Dark brown, deep hazel, dark olive.",ha:"Dark warm brown, deep auburn, dark chestnut.",
    c:["#982820","#B05C30","#B88818","#688830","#286848","#286058","#2A5878","#404878","#6E3870","#A05048","#486828","#C07818"],
    cn:["Oxblood","Burnt Sienna","Dark Gold","Khaki","Bottle Green","Deep Teal","Prussian","Navy Plum","Mulberry","Brick","Hunter","Toffee"],
    ic:["#F5E8E0","#E8E8D4","#E0E8E8","#E8E0EC"],ne:["#201010","#382818","#584830","#887050","#B8A080","#E8DCC8"],mt:"Burnished gold, dark bronze, aged copper",
    av:"Pastels, cool icy tones, bright neons.",ac:["#F8C0D0","#B0D0F0","#C8B0E0","#F0F020"],al:["Powder pink","Icy blue","Cool lavender","Bright lemon"],
    mk:"Deep bronze blush, burgundy lip, espresso eye",
    pt:{b:"Large dramatic dark florals",m:"Rich warm prints, dark plaid",d:"Small rich prints in deep tones"}},
  dw:{s:"Winter",n:"Dark Winter",e:"🌑",d:"Depth",d2:"Coolness",mu:"H:Med-cool V:Dark C:Med-high",fl:"Dark Autumn and True Winter",si:["da","tw"],
    desc:"The deepest Winter. Dark, dramatic, cool — dark jewel tones. Includes icies.",
    sk:"Cool-neutral — porcelain to deep cool brown.",ey:"Very dark brown, dark brown-black, deep cool blue.",ha:"Black, dark ash brown, dark cool brown.",
    c:["#941C30","#A03840","#A88818","#487830","#1E5E4A","#205868","#1E3A6E","#3A2878","#682060","#B03050","#184838","#782848"],
    cn:["Garnet","Crimson","Antique Gold","Pine","Emerald","Dark Teal","Sapphire","Royal Purple","Damson","Claret","Forest","Wine"],
    ic:["#F0E8EC","#E8ECF0","#E0F0EC","#F0ECE0"],ne:["#0A0A10","#181820","#303040","#606878","#A0A8B0","#E8E8EC"],mt:"Silver, dark gunmetal, white gold",
    av:"Warm earthy tones, muted colours, gold.",ac:["#C8A870","#D0B898","#E87830","#808060"],al:["Camel","Warm beige","Orange","Muted olive"],
    mk:"Deep cool berry blush, wine lip, midnight navy eye",
    pt:{b:"High-contrast bold prints",m:"Sharp graphic patterns",d:"Fine high-contrast geometrics"}},
  tw:{s:"Winter",n:"True Winter",e:"❄️",d:"Coolness",d2:"Brightness",mu:"H:Cool V:Med C:Med-high",fl:"Dark Winter and Bright Winter",si:["dw","bw"],
    desc:"The coolest Winter — frosty, brilliant, high-contrast. Black and white are power neutrals.",
    sk:"Distinctly cool — porcelain, cool olive, cool beige.",ey:"Dark cool brown, icy blue, grey-blue, vivid cool green.",ha:"Black with blue sheen, dark ash brown. Or silver/white.",
    c:["#C01030","#B82858","#887820","#286828","#186058","#104878","#182870","#381878","#781858","#D83868","#004050","#5838A0"],
    cn:["True Red","Magenta","Olive Gold","Emerald","Deep Jade","Marine","Navy","Violet","Raspberry","Hot Pink","Dark Teal","Iris"],
    ic:["#F0E4EC","#E4E8F4","#E0F0EC","#F2ECF4"],ne:["#000000","#181828","#404858","#808898","#C0C8D0","#FFFFFF"],mt:"Cool silver, polished platinum",
    av:"Warm, golden, earthy tones.",ac:["#E87830","#C8A870","#B86838","#E0C040"],al:["Orange","Warm tan","Rust","Golden yellow"],
    mk:"Cool berry blush, true red lip, charcoal eye",
    pt:{b:"High-contrast crisp patterns, bold stripes",m:"Clean graphic prints",d:"Crisp fine stripes, precise motifs"}},
  bw:{s:"Winter",n:"Bright Winter",e:"💎",d:"Brightness",d2:"Coolness",mu:"H:Med-cool V:Med C:High",fl:"True Winter and Bright Spring",si:["tw","bs"],
    desc:"The most vivid cool palette. Maximum saturation. Electric jewel tones.",
    sk:"Clear cool-neutral — porcelain, cool-neutral beige.",ey:"Bright blue, vivid green, clear cool hazel.",ha:"Dark brown, black. Or very bright blonde.",
    c:["#D01030","#E02068","#E0B800","#20A848","#009078","#0078B8","#003CC8","#6020C0","#A818A0","#F04088","#008888","#8830D0"],
    cn:["Scarlet","Fuchsia","Citron","Emerald","Jade","Azure","Cobalt","Purple","Magenta","Hot Pink","Teal","Violet"],
    ic:null,ne:["#080818","#202038","#484868","#9898B0","#D8D8E0","#F8F8FF"],mt:"Bright silver, white gold, platinum",
    av:"Muted, dusty, earth tones.",ac:["#8A7E6B","#7A8860","#C8A870","#A898A8"],al:["Mushroom","Dusty sage","Camel","Muted mauve"],
    mk:"Bright cool pink blush, fuchsia lip, vivid emerald eye",
    pt:{b:"Bold colour-blocking, large geometrics",m:"Vivid stripes, saturated prints",d:"Small vivid geometrics"}},
};
var FL=["bs","ts","ls","lsu","tsu","ssu","sa","ta","da","dw","tw","bw"];
function metalTip(eye,warm){
  if(eye==="blue_grey") return warm?"Cool eyes love silver — try rose gold to bridge with warm skin.":"Silver and platinum mirror your cool eyes.";
  if(eye==="green") return warm?"Gold draws out warm flecks in green eyes.":"White gold emphasises cool green clarity.";
  if(eye==="hazel_amber") return warm?"Yellow gold and bronze illuminate warm eyes.":"Rose gold bridges warm eyes with cool skin.";
  if(eye==="dark_brown") return warm?"Rich gold and copper bring depth beside dark eyes.":"Silver creates striking contrast with dark eyes.";
  return "Rose gold bridges warm and cool tones — versatile for your eyes.";
}
var QS=[
  {id:"q0",cat:"About You",q:"How do you identify?",tip:"Helps us tailor pattern, fit, and styling guidance.",
   o:[{l:"Woman",v:"woman",c:"#C098B8"},{l:"Man",v:"man",c:"#7890A8"}]},
  {id:"q1",cat:"Hue",q:"Look at the veins inside your wrist in daylight. What colour?",tip:"Green = warm. Blue/purple = cool.",
   o:[{l:"Green or olive",v:"warm",c:"#5B8C5A"},{l:"Blue or purple",v:"cool",c:"#6B5B95"},{l:"Both equally",v:"neutral",c:"#8A7E6B"}]},
  {id:"q2",cat:"Hue",q:"Gold vs silver jewellery — which makes skin look clearer?",tip:"Gold = warm. Silver = cool.",
   o:[{l:"Gold looks better",v:"warm",c:"#D4A520"},{l:"Silver looks better",v:"cool",c:"#B0B0C0"},{l:"Both equally",v:"neutral",c:"#B0A090"}]},
  {id:"q3",cat:"Hue",q:"Hold white paper next to bare face. What does skin cast?",tip:"Yellow/peach = warm. Pink/rose = cool.",
   o:[{l:"Yellowish, peachy, golden",v:"warm",c:"#F0D8A0"},{l:"Pinkish, rosy, bluish",v:"cool",c:"#E8C0D0"},{l:"Greyish, olive, unclear",v:"neutral",c:"#C8C0B0"}]},
  {id:"q4",cat:"Hue",q:"How does skin respond to sun?",tip:"Golden tan = warmer. Burning = cooler.",
   o:[{l:"Tan easily, golden glow",v:"warm",c:"#CCA068"},{l:"Burn first, tan lightly",v:"cool",c:"#F0D0C8"},{l:"Mixed response",v:"neutral",c:"#D8C0A0"}]},
  {id:"q5",cat:"Features",q:"What is the predominant colour of your eyes?",tip:"Eye colour helps determine your ideal metals.",
   o:[{l:"Light blue, grey",v:"blue_grey",c:"#7898B8"},{l:"Green, teal, hazel-green",v:"green",c:"#5A8A5A"},{l:"Warm brown, hazel, amber",v:"hazel_amber",c:"#9A7848"},{l:"Dark brown or black",v:"dark_brown",c:"#3A2818"}]},
  {id:"q6",cat:"Hair",q:"Is your hair currently dyed or highlighted?",tip:"We need natural colour — DNA determines your season.",
   o:[{l:"No — natural colour",v:"natural",c:"#8A7E6B"},{l:"Yes — dyed or highlighted",v:"dyed",c:"#C898C0"}]},
  {id:"q7",cat:"Hair",q:"What is (or was) your natural hair colour?",tip:"Recall pre-treatment shade. If greying, recall pre-grey.",
   o:[{l:"Light blonde / strawberry",v:"lw",c:"#D8C090"},{l:"Ash blonde / cool light brown",v:"lc",c:"#A8A090"},{l:"Medium warm brown / auburn",v:"mw",c:"#8A6838"},{l:"Medium ash / cool brown",v:"mc",c:"#6A5848"},{l:"Dark brown or black",v:"dk",c:"#2A1810"}]},
  {id:"q8",cat:"Value",q:"Using NATURAL hair + skin, how deep is your colouring?",tip:"Fair + light = light. Rich + dark = deep.",
   o:[{l:"Light",v:"light",c:"#EEE4D4"},{l:"Medium",v:"medium",c:"#B8A080"},{l:"Deep",v:"deep",c:"#503828"}]},
  {id:"q9",cat:"Chroma",q:"Using NATURAL hair, contrast between skin and hair?",tip:"High = bright colours suit. Low = softer tones.",
   o:[{l:"High — dramatic",v:"high",c:"#181830"},{l:"Medium",v:"medium",c:"#606068"},{l:"Low — features blend",v:"low",c:"#A0A098"}]},
  {id:"q10",cat:"Chroma",q:"Wearing vivid colour near your face — what happens?",tip:"Tests whether features hold bright colours.",
   o:[{l:"I come alive",v:"bright",c:"#1060C0"},{l:"It overpowers me",v:"muted",c:"#8890A0"},{l:"Depends on colour",v:"moderate",c:"#5878A0"}]},
  {id:"q11",cat:"Features",q:"Scale of your facial features?",tip:"Determines ideal pattern size.",
   o:[{l:"Bold — large eyes, full lips, strong bones",v:"bold",c:"#483828"},{l:"Balanced — moderate",v:"medium",c:"#887868"},{l:"Delicate — petite, fine-boned",v:"delicate",c:"#C8B8A8"}]},
  {id:"q12",cat:"Flow",q:"Which neutrals look most flattering?",tip:"Reveals seasonal family.",
   o:[{l:"Camel, warm brown, cream",v:"warm",c:"#C0A060"},{l:"Navy, charcoal, cool grey",v:"cool",c:"#404858"},{l:"Taupe, mushroom, soft grey",v:"soft",c:"#A09888"}]},
];
function solve(a){
  var t=[a.q1,a.q2,a.q3,a.q4],w=0,c=0,i;
  for(i=0;i<t.length;i++){if(t[i]==="warm")w++;if(t[i]==="cool")c++;}
  var d=a.q8,ct=a.q9,cl=a.q10,n=a.q12;
  var warm=w>c||(w===c&&n==="warm"),cool=c>w||(w===c&&n==="cool");
  var bright=cl==="bright"||ct==="high",muted=cl==="muted"||ct==="low";
  if(warm){if(d==="light") return bright?"bs":"ls";if(d==="deep") return bright?"da":"ta";if(bright) return "bs";if(muted) return "sa";return "ts";}
  if(cool){if(d==="light") return bright?"bw":"lsu";if(d==="deep") return bright?"tw":"dw";if(bright) return "bw";if(muted) return "ssu";return "tsu";}
  if(muted) return d==="deep"?"da":(n==="warm"?"sa":"ssu");
  if(bright) return d==="deep"?"dw":"bs";
  if(d==="light") return n==="warm"?"ls":"lsu";
  return n==="warm"?"ts":"tsu";
}
function Sw(props){var sz=props.size||36; return (
  <div style={{textAlign:"center"}}>
    <div style={{width:sz,height:sz,borderRadius:7,backgroundColor:props.color,border:"1px solid rgba(0,0,0,.06)",margin:"0 auto"}}/>
    {props.label ? <div style={{fontSize:7.5,color:"#6B6560",marginTop:3,lineHeight:"1.2",maxWidth:sz+10,margin:"3px auto 0"}}>{props.label}</div> : null}
  </div>
);}
var GR={Spring:"linear-gradient(135deg,#FDF9F0,#FFF3D8)",Summer:"linear-gradient(135deg,#F6F4FA,#EDE6F2)",Autumn:"linear-gradient(135deg,#FBF5EB,#F2E8D0)",Winter:"linear-gradient(135deg,#F2F4F9,#E4E9F4)"};
function Card(props){ return <div style={{background:"rgba(255,253,248,.7)",borderRadius:14,padding:"20px 18px",border:"1px solid rgba(80,70,60,.08)",marginBottom:props.mb||0}}>{props.children}</div>; }
function Lbl(props){ return <div style={{fontSize:9.5,letterSpacing:4,textTransform:"uppercase",color:"#8A8078",fontWeight:600,marginBottom:12,textAlign:"center"}}>{props.children}</div>; }
function Btn(props){ return <button onClick={props.onClick} style={{display:"block",width:"100%",padding:props.primary?"14px":"12px",fontSize:11,letterSpacing:3,textTransform:"uppercase",fontWeight:600,background:props.primary?"#3A3530":"transparent",color:props.primary?"#FAF6EE":"#8A8078",border:props.primary?"none":"1px solid rgba(80,70,60,.15)",borderRadius:10,cursor:"pointer",marginBottom:8}}>{props.children}</button>; }

export default function App(){
  var stV=useState("home"),view=stV[0],setView=stV[1];
  var stSaved=useState(null),saved=stSaved[0],setSaved=stSaved[1];
  var stP=useState(null),ph=stP[0],setPh=stP[1];
  var stQ=useState(0),qi=stQ[0],setQi=stQ[1];
  var stA=useState({}),ans=stA[0],setAns=stA[1];
  var stR=useState(null),res=stR[0],setRes=stR[1];
  var stF=useState(true),fade=stF[0],setFade=stF[1];
  var stEx=useState(null),exp=stEx[0],setExp=stEx[1];
  var stCam=useState(false),camOn=stCam[0],setCamOn=stCam[1];
  var stTier=useState("free"),tier=stTier[0],setTier=stTier[1];
  var stWP=useState(null),wardPhoto=stWP[0],setWardPhoto=stWP[1];
  var stWCam=useState(false),wardCamOn=stWCam[0],setWardCamOn=stWCam[1];
  var stWRes=useState(null),wardRes=stWRes[0],setWardRes=stWRes[1];
  var stWLoad=useState(false),wardLoad=stWLoad[0],setWardLoad=stWLoad[1];

  // Auth state
  var stUser=useState(null),user=stUser[0],setUser=stUser[1];
  var stAuthLoad=useState(true),authLoading=stAuthLoad[0],setAuthLoading=stAuthLoad[1];
  var stAuthView=useState("signin"),authView=stAuthView[0],setAuthView=stAuthView[1];
  var stEmail=useState(""),email=stEmail[0],setEmail=stEmail[1];
  var stPass=useState(""),pass=stPass[0],setPass=stPass[1];
  var stAuthErr=useState(""),authErr=stAuthErr[0],setAuthErr=stAuthErr[1];
  var stAuthMsg=useState(""),authMsg=stAuthMsg[0],setAuthMsg=stAuthMsg[1];
  var stAuthBusy=useState(false),authBusy=stAuthBusy[0],setAuthBusy=stAuthBusy[1];

  var wardVidRef=useRef(null);
  var wardCanRef=useRef(null);
  var wardStreamRef=useRef(null);
  var fR=useRef(null);
  var vidRef=useRef(null);
  var canRef=useRef(null);
  var streamRef=useRef(null);

  useEffect(function(){
    try{var s=document.createElement("style");s.textContent='@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap");*{font-family:"Quicksand",sans-serif !important;box-sizing:border-box}';document.head.appendChild(s);}catch(e){}

    // Check if user is already logged in
    supabase.auth.getSession().then(function(r){
      setUser(r.data.session?.user ?? null);
      setAuthLoading(false);
    });

    // Listen for login/logout changes
    var sub=supabase.auth.onAuthStateChange(function(_,session){
      setUser(session?.user ?? null);
    });
    return function(){ sub.data.subscription.unsubscribe(); };
  },[]);

  async function handleSignIn(){
    setAuthBusy(true);setAuthErr("");
    var r=await supabase.auth.signInWithPassword({email:email,password:pass});
    if(r.error)setAuthErr(r.error.message);
    setAuthBusy(false);
  }
  async function handleSignUp(){
    setAuthBusy(true);setAuthErr("");setAuthMsg("");
    var r=await supabase.auth.signUp({email:email,password:pass});
    if(r.error){setAuthErr(r.error.message);}
    else{setAuthMsg("Check your email to confirm your account, then sign in.");}
    setAuthBusy(false);
  }
  async function handleForgot(){
    if(!email){setAuthErr("Enter your email address first.");return;}
    setAuthBusy(true);setAuthErr("");
    await supabase.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin});
    setAuthMsg("Password reset link sent — check your email.");
    setAuthBusy(false);
  }
  async function handleSignOut(){
    await supabase.auth.signOut();
    setUser(null);setRes(null);setSaved(null);setView("home");
  }

  var go=useCallback(function(x){setFade(false);setTimeout(function(){setView(x);setFade(true);try{window.scrollTo({top:0,behavior:"smooth"})}catch(e){}},250);},[]);
  function doA(qid,val){var nx=Object.assign({},ans);nx[qid]=val;setAns(nx);if(qi<QS.length-1){setFade(false);setTimeout(function(){setQi(qi+1);setFade(true);},190);}else{var r=solve(nx);setRes(r);saveResult(r,nx);go("result");}}
  function restart(){setPh(null);setQi(0);setAns({});setRes(null);go("home");}
  async function saveResult(r,a){setSaved({res:r,ans:a});if(!window.storage) return;try{await window.storage.set("myhue_result",JSON.stringify({res:r,ans:a,date:new Date().toISOString()}));}catch(e){}}
  function startCam(){
    setCamOn(true);
    setTimeout(function(){
      if(!vidRef.current) return;
      navigator.mediaDevices.getUserMedia({video:{facingMode:"user"},audio:false}).then(function(stream){
        streamRef.current=stream;vidRef.current.srcObject=stream;vidRef.current.play();
      }).catch(function(){setCamOn(false);setErr("Camera access denied.");});
    },100);
  }
  function capture(){
    if(!vidRef.current||!canRef.current) return;
    var v=vidRef.current,c=canRef.current;c.width=v.videoWidth;c.height=v.videoHeight;
    c.getContext("2d").drawImage(v,0,0);setPh(c.toDataURL("image/jpeg",0.85));stopCam();
  }
  function stopCam(){
    if(streamRef.current){streamRef.current.getTracks().forEach(function(t){t.stop();});streamRef.current=null;}setCamOn(false);
  }
  function startWardCam(){
    setWardCamOn(true);setWardRes(null);
    setTimeout(function(){
      if(!wardVidRef.current) return;
      navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:false}).then(function(stream){
        wardStreamRef.current=stream;wardVidRef.current.srcObject=stream;wardVidRef.current.play();
      }).catch(function(){setWardCamOn(false);});
    },100);
  }
  function captureWard(){
    if(!wardVidRef.current||!wardCanRef.current) return;
    var v=wardVidRef.current,c=wardCanRef.current;c.width=v.videoWidth;c.height=v.videoHeight;
    c.getContext("2d").drawImage(v,0,0);setWardPhoto(c.toDataURL("image/jpeg",0.85));stopWardCam();
  }
  function stopWardCam(){
    if(wardStreamRef.current){wardStreamRef.current.getTracks().forEach(function(t){t.stop();});wardStreamRef.current=null;}setWardCamOn(false);
  }
  async function checkWardMatch(photo,palette){
    setWardLoad(true);setWardRes(null);
    try{
      var paletteNames=palette.cn.join(", ");
      var avoidNames=palette.al?palette.al.join(", "):"none";
      var resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:"image/jpeg",data:photo.split(",")[1]}},{type:"text",text:"This is a photo of a clothing item. The person's colour palette for their season '"+palette.n+"' includes: "+paletteNames+". Colours to avoid: "+avoidNames+". In 2-3 short sentences, tell them (1) what colour the garment is, (2) whether it is a good match, partial match, or avoid, and (3) one specific styling tip. Be warm and direct."}]}]})});
      var data=await resp.json();
      var txt=data.content&&data.content[0]&&data.content[0].text?data.content[0].text:"Unable to analyse — please try again.";
      setWardRes(txt);
    }catch(e){setWardRes("Analysis failed — please check your connection and try again.");}
    setWardLoad(false);
  }

  var p=res?P[res]:null;var sp=saved&&saved.res?P[saved.res]:null;var feat=ans.q11||"medium";var pKey=feat==="bold"?"b":feat==="delicate"?"d":"m";

  // Show loading spinner while checking login status
  if(authLoading) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(170deg,#FAF6EE,#EDE7DC)"}}>
      <div style={{fontSize:13,letterSpacing:3,textTransform:"uppercase",color:"#9A9088"}}>Loading…</div>
    </div>
  );

  // Show login/signup screen if not logged in
  if(!user) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(170deg,#FAF6EE 0%,#EDE7DC 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{width:"100%",maxWidth:400,background:"rgba(255,253,248,.95)",borderRadius:20,padding:"40px 32px",border:"1px solid rgba(80,70,60,.1)",boxShadow:"0 8px 40px rgba(80,70,60,.08)"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <h1 style={{fontSize:26,fontWeight:700,color:"#3A3530",margin:"0 0 4px",letterSpacing:1}}>MyHue</h1>
          <div style={{fontSize:9,letterSpacing:5,textTransform:"uppercase",color:"#9A9088"}}>Your Colour Assistant</div>
          <div style={{width:30,height:1.5,background:"#C8BEB0",margin:"12px auto 0",borderRadius:1}}/>
        </div>

        <div style={{display:"flex",borderRadius:10,overflow:"hidden",border:"1px solid rgba(80,70,60,.12)",marginBottom:24}}>
          {["signin","signup"].map(function(v){return(
            <button key={v} onClick={function(){setAuthView(v);setAuthErr("");setAuthMsg("");}} style={{flex:1,padding:"10px",fontSize:11,letterSpacing:2,textTransform:"uppercase",fontWeight:600,border:"none",cursor:"pointer",background:authView===v?"#3A3530":"transparent",color:authView===v?"#FAF6EE":"#9A9088",transition:"all .2s"}}>
              {v==="signin"?"Sign In":"Sign Up"}
            </button>
          );})}
        </div>

        {authErr && <div style={{background:"rgba(180,60,50,.08)",border:"1px solid rgba(180,60,50,.2)",borderRadius:8,padding:"10px 12px",fontSize:12,color:"#B43C32",marginBottom:16,lineHeight:1.5}}>{authErr}</div>}
        {authMsg && <div style={{background:"rgba(50,130,80,.08)",border:"1px solid rgba(50,130,80,.2)",borderRadius:8,padding:"10px 12px",fontSize:12,color:"#32825A",marginBottom:16,lineHeight:1.5}}>{authMsg}</div>}

        <div style={{marginBottom:14}}>
          <div style={{fontSize:9.5,letterSpacing:2.5,textTransform:"uppercase",color:"#8A8078",fontWeight:600,marginBottom:6}}>Email</div>
          <input type="email" value={email} onChange={function(e){setEmail(e.target.value);}} placeholder="you@example.com"
            style={{width:"100%",padding:"11px 14px",borderRadius:8,border:"1px solid rgba(80,70,60,.18)",fontSize:13,color:"#3A3530",background:"#FFFFFF",outline:"none",boxSizing:"border-box"}}/>
        </div>
        {authView!=="forgot" && (
          <div style={{marginBottom:20}}>
            <div style={{fontSize:9.5,letterSpacing:2.5,textTransform:"uppercase",color:"#8A8078",fontWeight:600,marginBottom:6}}>Password</div>
            <input type="password" value={pass} onChange={function(e){setPass(e.target.value);}} placeholder="••••••••"
              onKeyDown={function(e){if(e.key==="Enter")authView==="signin"?handleSignIn():handleSignUp();}}
              style={{width:"100%",padding:"11px 14px",borderRadius:8,border:"1px solid rgba(80,70,60,.18)",fontSize:13,color:"#3A3530",background:"#FFFFFF",outline:"none",boxSizing:"border-box"}}/>
          </div>
        )}

        <button onClick={authView==="signin"?handleSignIn:authView==="signup"?handleSignUp:handleForgot}
          disabled={authBusy}
          style={{width:"100%",padding:"13px",borderRadius:10,background:"#3A3530",color:"#FAF6EE",border:"none",cursor:authBusy?"not-allowed":"pointer",fontSize:11,fontWeight:700,letterSpacing:3,textTransform:"uppercase",opacity:authBusy?.7:1,marginBottom:14}}>
          {authBusy?"Please wait…":authView==="signin"?"Sign In":authView==="signup"?"Create Account":"Send Reset Link"}
        </button>

        {authView==="signin" && (
          <div style={{textAlign:"center"}}>
            <button onClick={function(){setAuthView("forgot");setAuthErr("");setAuthMsg("");}} style={{fontSize:11,color:"#B8935A",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>Forgot password?</button>
          </div>
        )}
        {authView==="forgot" && (
          <div style={{textAlign:"center"}}>
            <button onClick={function(){setAuthView("signin");setAuthErr("");setAuthMsg("");}} style={{fontSize:11,color:"#9A9088",background:"none",border:"none",cursor:"pointer"}}>← Back to sign in</button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(170deg,#FAF6EE 0%,#F2EDE4 40%,#EDE7DC 100%)",color:"#3A3530"}}>
    <div style={{maxWidth:580,margin:"0 auto",padding:"16px 16px 56px",opacity:fade?1:0,transform:fade?"translateY(0)":"translateY(8px)",transition:"all .26s"}}>

    <header style={{textAlign:"center",padding:"16px 0 20px"}}>
      <h1 style={{fontSize:28,fontWeight:700,margin:0,color:"#3A3530",letterSpacing:1}}>MyHue</h1>
      <div style={{fontSize:9,letterSpacing:5,textTransform:"uppercase",color:"#9A9088",fontWeight:500,marginTop:4}}>Your Colour Assistant</div>
      <div style={{width:30,height:1.5,background:"#C8BEB0",margin:"10px auto 6px",borderRadius:1}}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        <span style={{fontSize:10,color:"#9A9088"}}>{user.email}</span>
        <button onClick={handleSignOut} style={{fontSize:9.5,letterSpacing:1.5,textTransform:"uppercase",color:"#9A9088",background:"none",border:"1px solid rgba(80,70,60,.15)",borderRadius:5,padding:"3px 10px",cursor:"pointer"}}>Sign out</button>
      </div>
    </header>

    {view==="home" && (
      <div>
        {sp && (
          <Card mb={14}><div style={{textAlign:"center"}}>
            <div style={{fontSize:28}}>{sp.e}</div>
            <Lbl>Your Saved Palette</Lbl>
            <h3 style={{fontSize:18,fontWeight:700,color:"#3A3530",margin:"0 0 8px"}}>{sp.n}</h3>
            <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:10}}>{sp.c.slice(0,8).map(function(c,i){return <Sw key={i} color={c} size={26}/>;})}</div>
            <Btn onClick={function(){setRes(saved.res);if(saved.ans)setAns(saved.ans);go("result");}}>View Full Results</Btn>
          </div></Card>
        )}
        <p style={{textAlign:"center",fontSize:14,lineHeight:1.7,color:"#5A524A",maxWidth:440,margin:"0 auto 20px"}}>Discover which colours create natural harmony with your colouring, built on the <strong>Sci/ART 12-tone system</strong>.</p>
        <Btn primary onClick={function(){go("guide")}}>{sp?"Retake Analysis":"Start My Analysis"}</Btn>
        <Btn onClick={function(){go("theory")}}>Understand the Theory</Btn>
      </div>
    )}

    {view==="theory" && (
      <div>
        <Card mb={14}><Lbl>The Sci/ART System</Lbl>
          <div style={{fontSize:12.5,color:"#5A524A",lineHeight:1.7}}>
            <p style={{margin:"0 0 10px"}}>Developed by <strong>Kathryn Kalisz</strong> (Master Munsell Colourist). Maps colouring across three dimensions:</p>
            <div style={{background:"rgba(248,244,238,.5)",borderRadius:10,padding:"12px",margin:"0 0 10px"}}>
              <p style={{margin:"0 0 5px"}}><strong>Hue</strong> — Warm or cool undertone.</p>
              <p style={{margin:"0 0 5px"}}><strong>Value</strong> — Light or dark overall.</p>
              <p style={{margin:0}}><strong>Chroma</strong> — Vivid or muted.</p>
            </div>
            <p style={{margin:0}}>12 palettes — each colour belongs to one group. Sub-seasons flow into neighbours — the <strong>flow theory</strong>.</p>
          </div>
        </Card>
        <Card mb={14}><Lbl>All 12 Tones</Lbl>
          {FL.map(function(k){var pp=P[k]; return (
            <div key={k} style={{marginBottom:6,paddingBottom:6,borderBottom:"1px solid rgba(80,70,60,.06)"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={function(){setExp(exp===k?null:k);}}>
                <span style={{fontSize:13}}>{pp.e}</span><span style={{fontSize:11.5,fontWeight:700}}>{pp.n}</span>
                <span style={{fontSize:8,color:"#9A9088",marginLeft:"auto"}}>{pp.mu}</span>
              </div>
              {exp===k && (<div style={{marginTop:4,paddingLeft:20,fontSize:11,color:"#5A524A",lineHeight:"1.5"}}>
                <p style={{margin:"0 0 4px"}}>{pp.desc}</p>
                <div style={{display:"flex",gap:2,flexWrap:"wrap"}}>{pp.c.map(function(c,i){return <div key={i} style={{width:13,height:13,borderRadius:3,backgroundColor:c}}/>;})}</div>
              </div>)}
            </div>
          );})}
        </Card>
        <Btn primary onClick={function(){go("guide")}}>Start Analysis</Btn>
        <Btn onClick={function(){go("home")}}>Back</Btn>
      </div>
    )}

    {view==="guide" && (
      <div>
        <Card mb={14}><Lbl>For accurate results, do the following:</Lbl>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {[["☀️","Natural Daylight","Face a window."],["🧴","Bare Skin","Remove all makeup."],["⬜","White Wall","No coloured walls."],["👕","White Top","Remove jewellery."],["📷","No Filters","All filters OFF."],["💇","Natural Hair","Clip dyed hair back."]].map(function(x,i){
              return (<div key={i} style={{background:"rgba(248,244,238,.5)",borderRadius:8,padding:"8px 7px"}}>
                <div style={{fontSize:15,marginBottom:2}}>{x[0]}</div>
                <div style={{fontSize:10,fontWeight:700,color:"#3A3530",marginBottom:1}}>{x[1]}</div>
                <div style={{fontSize:10,color:"#6B6560",lineHeight:"1.4"}}>{x[2]}</div>
              </div>);
            })}
          </div>
        </Card>
        <div style={{background:"#FFFFFF",borderRadius:14,padding:"20px 18px",border:"1px solid rgba(80,70,60,.08)",marginBottom:14}}>
          <Lbl>Upload selfie</Lbl>
          {camOn ? (
            <div style={{textAlign:"center",background:"#FFFFFF",borderRadius:10,padding:"12px 0"}}>
              <video ref={vidRef} style={{width:"100%",maxWidth:260,borderRadius:10,background:"#FFFFFF"}} playsInline muted/>
              <canvas ref={canRef} style={{display:"none"}}/>
              <div style={{marginTop:10,display:"flex",gap:8,justifyContent:"center"}}>
                <button onClick={capture} style={{padding:"10px 20px",borderRadius:8,background:"#3A3530",color:"#FAF6EE",border:"none",cursor:"pointer",fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase"}}>Capture</button>
                <button onClick={stopCam} style={{padding:"10px 16px",borderRadius:8,background:"transparent",color:"#8A8078",border:"1px solid rgba(80,70,60,.15)",cursor:"pointer",fontSize:11}}>Cancel</button>
              </div>
            </div>
          ) : (
            <div style={{textAlign:"center",background:"#FFFFFF",borderRadius:10,padding:"12px 0"}}>
              {ph ? (
                <div style={{position:"relative",display:"inline-block"}}>
                  <img src={ph} alt="" style={{width:110,height:140,objectFit:"cover",borderRadius:12,border:"2px solid rgba(80,70,60,.1)"}}/>
                  <button onClick={function(){setPh(null);if(fR.current)fR.current.value="";}} style={{position:"absolute",top:-6,right:-6,width:20,height:20,borderRadius:"50%",background:"#3A3530",color:"#FAF6EE",border:"none",cursor:"pointer",fontSize:11,lineHeight:"20px"}}>x</button>
                </div>
              ) : (
                <div>
                  <p style={{fontSize:10,color:"#8A8078",margin:"0 0 12px",lineHeight:"1.5"}}>White background shown for accurate skin reading.</p>
                  <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                    <button onClick={startCam} style={{padding:"10px 16px",borderRadius:8,background:"#3A3530",color:"#FAF6EE",border:"none",cursor:"pointer",fontSize:11,fontWeight:600,letterSpacing:1}}>Take Photo</button>
                    <label style={{padding:"10px 16px",borderRadius:8,background:"transparent",color:"#6B6560",border:"1px solid rgba(80,70,60,.15)",cursor:"pointer",fontSize:11,fontWeight:600,letterSpacing:1}}>
                      Upload
                      <input ref={fR} type="file" accept="image/*" style={{display:"none"}} onChange={function(e){var fi=e.target.files&&e.target.files[0];if(fi){var r=new FileReader();r.onload=function(ev){setPh(ev.target.result);};r.readAsDataURL(fi);}}}/>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <Btn primary onClick={function(){setQi(0);go("quiz");}}>Continue to Analysis</Btn>
        <Btn onClick={function(){go("home")}}>Back</Btn>
      </div>
    )}

    {view==="quiz" && (
      <div>
        <div style={{marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:9.5,letterSpacing:2,textTransform:"uppercase",color:"#8A8078",fontWeight:600}}>{qi+1}/{QS.length}</span>
            <span style={{fontSize:9.5,color:"#9A9088"}}>{QS[qi].cat}</span>
          </div>
          <div style={{height:3,background:"rgba(80,70,60,.08)",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:((qi+1)/QS.length*100)+"%",background:"linear-gradient(90deg,#B0A898,#8A8078)",borderRadius:2,transition:"width .3s"}}/></div>
        </div>
        {ph && <div style={{textAlign:"center",marginBottom:8}}><img src={ph} alt="" style={{width:44,height:55,objectFit:"cover",borderRadius:7,opacity:.85}}/></div>}
        <Card mb={0}>
          <h2 style={{fontSize:15,fontWeight:600,color:"#3A3530",margin:"0 0 6px",lineHeight:"1.4"}}>{QS[qi].q}</h2>
          <p style={{fontSize:10,color:"#8A8078",fontStyle:"italic",lineHeight:"1.5",margin:"0 0 12px",padding:"5px 8px",background:"rgba(248,244,238,.4)",borderRadius:6}}>{QS[qi].tip}</p>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {QS[qi].o.map(function(o,i){ return (
              <button key={i} onClick={function(){doA(QS[qi].id,o.v);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px",borderRadius:8,background:"rgba(248,244,238,.5)",border:"1px solid rgba(80,70,60,.08)",cursor:"pointer",textAlign:"left"}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:o.c,flexShrink:0,border:"2px solid rgba(255,255,255,.4)"}}/>
                <span style={{fontSize:12,color:"#3A3530"}}>{o.l}</span>
              </button>
            );})}
          </div>
        </Card>
        <button onClick={function(){if(qi>0){setFade(false);setTimeout(function(){setQi(qi-1);setFade(true);},190);}else{go("guide");}}} style={{display:"block",margin:"10px auto 0",background:"none",border:"none",color:"#9A9088",fontSize:10.5,cursor:"pointer"}}>Back</button>
      </div>
    )}

    {view==="result" && p && (
      <div>
        {/* Tier toggle — demo only, remove when Stripe is connected */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:14,padding:"8px 12px",background:"rgba(80,70,60,.04)",borderRadius:10,border:"1px dashed rgba(80,70,60,.15)"}}>
          <span style={{fontSize:9.5,letterSpacing:2,textTransform:"uppercase",color:"#9A9088",fontWeight:600}}>Demo tier:</span>
          <button onClick={function(){setTier("free");}} style={{padding:"4px 12px",borderRadius:6,fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",border:"1px solid rgba(80,70,60,.2)",background:tier==="free"?"#3A3530":"transparent",color:tier==="free"?"#FAF6EE":"#8A8078",cursor:"pointer"}}>Free</button>
          <button onClick={function(){setTier("paid");}} style={{padding:"4px 12px",borderRadius:6,fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",border:"1px solid rgba(80,70,60,.2)",background:tier==="paid"?"#B8935A":"transparent",color:tier==="paid"?"#FAF6EE":"#8A8078",cursor:"pointer"}}>Premium</button>
        </div>

        {/* Season header — visible to all */}
        <div style={{background:GR[p.s],borderRadius:16,padding:"22px 16px 18px",textAlign:"center",marginBottom:10,border:"1px solid rgba(80,70,60,.06)"}}>
          <div style={{fontSize:34,marginBottom:2}}>{p.e}</div>
          <div style={{fontSize:8.5,letterSpacing:4,textTransform:"uppercase",color:"#8A8078",fontWeight:600}}>Your Tone</div>
          <h2 style={{fontSize:24,fontWeight:700,color:"#3A3530",margin:"2px 0 3px"}}>{p.n}</h2>
          <div style={{fontSize:10,color:"#6B6560"}}><strong>{p.d}</strong> dominant · <strong>{p.d2}</strong> secondary</div>
        </div>

        {/* Description — visible to all */}
        <Card mb={10}><p style={{fontSize:12.5,color:"#5A524A",lineHeight:1.65,margin:0}}>{p.desc}</p></Card>

        {ph && (
          <Card mb={10}><div style={{display:"flex",gap:10,alignItems:"center"}}>
            <img src={ph} alt="" style={{width:56,height:70,objectFit:"cover",borderRadius:9,flexShrink:0}}/>
            <div style={{fontSize:10.5,color:"#5A524A",lineHeight:"1.5"}}>
              <div><strong>Skin:</strong> {p.sk}</div><div><strong>Eyes:</strong> {p.ey}</div><div><strong>Hair:</strong> {p.ha}</div>
              {ans.q6==="dyed" && <div style={{marginTop:3,fontSize:9.5,color:"#9A9088",fontStyle:"italic"}}>Based on natural hair — season won't change with dye.</div>}
            </div>
          </div></Card>
        )}

        {/* FREE: Top 5 colours only */}
        <Card mb={10}>
          <Lbl>Your Primary Colours</Lbl>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            {p.c.slice(0,5).map(function(c,i){ return <Sw key={i} color={c} size={44} label={p.cn[i]}/>; })}
          </div>
        </Card>

        {/* LOCKED section for free users */}
        {tier==="free" && (
          <div style={{position:"relative",marginBottom:10}}>
            <div style={{filter:"blur(3px)",pointerEvents:"none",opacity:0.45}}>
              <Card mb={10}><Lbl>Full Palette — 12 Colours</Lbl>
                <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:4}}>
                  {p.c.map(function(c,i){return <div key={i} style={{height:34,borderRadius:6,background:c}}/>;})}</div>
              </Card>
              <Card mb={10}><Lbl>Colours to Avoid</Lbl>
                <div style={{display:"flex",gap:7,justifyContent:"center",flexWrap:"wrap"}}>
                  {p.ac.map(function(c,i){return <div key={i} style={{width:38,height:38,borderRadius:7,background:c}}/>;})}</div>
              </Card>
              <Card mb={0}><Lbl>Makeup & Metals</Lbl>
                <p style={{fontSize:11.5,color:"#5A524A",margin:0,lineHeight:1.5}}>Warm peach blush, coral lip, gold jewellery and bronze eyeshadow work beautifully for your tone.</p>
              </Card>
            </div>
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px",textAlign:"center",background:"rgba(247,243,238,0.6)",borderRadius:14,border:"1px solid rgba(184,147,90,0.3)"}}>
              <div style={{fontSize:22,marginBottom:6}}>✦</div>
              <div style={{fontSize:13,fontWeight:700,color:"#3A3530",marginBottom:4}}>Unlock Your Full Palette</div>
              <p style={{fontSize:11,color:"#6B6560",lineHeight:1.5,margin:"0 0 14px",maxWidth:260}}>Upgrade to Premium for your complete 36-colour palette, colours to avoid, metals, makeup guide, and wardrobe scanner.</p>
              <button style={{padding:"11px 24px",borderRadius:8,background:"#B8935A",color:"#FAF6EE",border:"none",cursor:"pointer",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>Upgrade to Premium</button>
              <div style={{marginTop:8,fontSize:9.5,color:"#9A9088"}}>from £7.99/month · cancel anytime</div>
            </div>
          </div>
        )}

        {/* PAID: Full content */}
        {tier==="paid" && (
          <div>
            <Card mb={10}><Lbl>Full Palette</Lbl>
              <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:4,maxWidth:320,margin:"0 auto 12px"}}>
                {p.c.slice(5).map(function(c,i){return <Sw key={i} color={c} size={34} label={p.cn[i+5]}/>;})}</div>
              {p.ic && <div style={{marginTop:12}}><Lbl>Icies</Lbl><div style={{display:"flex",gap:4,justifyContent:"center"}}>{p.ic.map(function(c,i){return <Sw key={i} color={c} size={28}/>;})}</div></div>}
              <div style={{marginTop:12}}><Lbl>Neutrals</Lbl><div style={{display:"flex",gap:4,justifyContent:"center"}}>{p.ne.map(function(c,i){return <Sw key={i} color={c} size={28}/>;})}</div></div>
            </Card>

            <Card mb={10}><Lbl>Colours to Avoid</Lbl>
              <div style={{display:"flex",gap:7,justifyContent:"center",flexWrap:"wrap"}}>{p.ac&&p.ac.map(function(c,i){return <Sw key={i} color={c} size={38} label={p.al&&p.al[i]?p.al[i]:""}/>;})}</div>
            </Card>

            <Card mb={10}><Lbl>Your Best Metals</Lbl>
              <p style={{fontSize:11.5,color:"#3A3530",lineHeight:"1.5",margin:"0 0 8px"}}><strong>Season:</strong> {p.mt}</p>
              <div style={{background:"rgba(248,244,238,.45)",borderRadius:8,padding:"8px 10px"}}>
                <div style={{fontSize:8.5,letterSpacing:2,textTransform:"uppercase",color:"#8A8078",fontWeight:600,marginBottom:3}}>Based on Your Eyes</div>
                <p style={{fontSize:11,color:"#5A524A",lineHeight:"1.5",margin:0}}>{metalTip(ans.q5||"",p.s==="Spring"||p.s==="Autumn")}</p>
              </div>
            </Card>

            <Card mb={10}><Lbl>Pattern Guide</Lbl>
              <div style={{background:"rgba(248,244,238,.45)",borderRadius:8,padding:"8px 10px"}}>
                <div style={{fontSize:8.5,letterSpacing:2,textTransform:"uppercase",color:"#8A8078",fontWeight:600,marginBottom:3}}>For {feat==="bold"?"bold":feat==="delicate"?"delicate":"balanced"} features</div>
                <p style={{fontSize:11,color:"#5A524A",lineHeight:"1.5",margin:0}}>{p.pt&&p.pt[pKey]?p.pt[pKey]:""}</p>
              </div>
            </Card>

            <Card mb={10}><Lbl>Makeup</Lbl><p style={{fontSize:11.5,color:"#3A3530",lineHeight:"1.5",margin:0}}>{p.mk}</p></Card>

            <Card mb={10}><Lbl>Flow Position</Lbl>
              <p style={{fontSize:11,color:"#5A524A",lineHeight:"1.5",margin:"0 0 8px",textAlign:"center"}}><strong>{p.n}</strong> sits between {p.fl}.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5}}>
                {(function(){var ks=[];if(p.si){for(var i=0;i<p.si.length;i++){if(P[p.si[i]])ks.push(p.si[i]);}}if(ks.indexOf(res)===-1)ks.push(res);ks.sort(function(a,b){return FL.indexOf(a)-FL.indexOf(b);});var out=[];for(var j=0;j<ks.length;j++){var k=ks[j],pp=P[k];if(!pp)continue;out.push(
                  <div key={k} style={{background:k===res?"rgba(80,70,60,.06)":"rgba(248,244,238,.4)",borderRadius:7,padding:"7px 5px",textAlign:"center",border:k===res?"1.5px solid #B0A898":"1px solid rgba(80,70,60,.04)"}}>
                    <div style={{fontSize:11}}>{pp.e}</div>
                    <div style={{fontSize:9,fontWeight:700,color:"#3A3530",marginTop:1}}>{pp.n.replace(pp.s+" ","")}</div>
                    {k===res && <div style={{fontSize:7,color:"#9A9088",fontStyle:"italic"}}>You</div>}
                    <div style={{display:"flex",gap:1.5,justifyContent:"center",marginTop:2}}>{pp.c.slice(0,5).map(function(c,i){return <div key={i} style={{width:7,height:7,borderRadius:2,backgroundColor:c}}/>;})}</div>
                  </div>
                );}return out;})()}
              </div>
            </Card>

            {/* Wardrobe Scanner button — paid only */}
            <div style={{background:"linear-gradient(135deg,rgba(184,147,90,0.1),rgba(196,136,122,0.1))",borderRadius:14,padding:"18px",marginBottom:10,border:"1px solid rgba(184,147,90,0.25)",textAlign:"center"}}>
              <div style={{fontSize:20,marginBottom:4}}>👗</div>
              <div style={{fontSize:12,fontWeight:700,color:"#3A3530",marginBottom:4}}>Wardrobe Scanner</div>
              <p style={{fontSize:10.5,color:"#6B6560",margin:"0 0 12px",lineHeight:1.5}}>Shopping or checking your wardrobe? Take a photo of any garment to see if it matches your palette.</p>
              <button onClick={function(){setWardPhoto(null);setWardRes(null);go("wardrobe");}} style={{padding:"10px 20px",borderRadius:8,background:"#B8935A",color:"#FAF6EE",border:"none",cursor:"pointer",fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"}}>Open Scanner</button>
            </div>
          </div>
        )}

        <Card mb={10}><p style={{fontSize:10.5,color:"#8A8078",lineHeight:"1.6",textAlign:"center",margin:0,fontStyle:"italic"}}>This is a starting point. Professional draping remains the gold standard.</p></Card>
        <Btn onClick={function(){go("home")}}>Back to Home</Btn>
        <Btn onClick={restart}>Start Over</Btn>
      </div>
    )}

    {/* WARDROBE SCANNER — paid only */}
    {view==="wardrobe" && p && (
      <div>
        <div style={{textAlign:"center",marginBottom:14}}>
          <div style={{fontSize:9.5,letterSpacing:4,textTransform:"uppercase",color:"#9A9088",fontWeight:600,marginBottom:4}}>Wardrobe Scanner</div>
          <h2 style={{fontSize:18,fontWeight:700,color:"#3A3530",margin:"0 0 4px"}}>Does it match?</h2>
          <p style={{fontSize:11,color:"#8A8078",margin:0}}>Checking against your <strong>{p.n}</strong> palette</p>
        </div>

        {/* Palette reminder */}
        <Card mb={10}>
          <Lbl>Your Colours</Lbl>
          <div style={{display:"flex",gap:4,justifyContent:"center",flexWrap:"wrap"}}>
            {p.c.map(function(c,i){return <div key={i} title={p.cn[i]} style={{width:26,height:26,borderRadius:5,background:c,border:"1px solid rgba(0,0,0,.06)"}}/>;})}</div>
        </Card>

        {/* Camera / upload area */}
        <div style={{background:"#FFFFFF",borderRadius:14,padding:"20px 18px",border:"1px solid rgba(80,70,60,.08)",marginBottom:10}}>
          <Lbl>Photograph the garment</Lbl>
          {wardCamOn ? (
            <div style={{textAlign:"center"}}>
              <video ref={wardVidRef} style={{width:"100%",maxWidth:280,borderRadius:10}} playsInline muted/>
              <canvas ref={wardCanRef} style={{display:"none"}}/>
              <div style={{marginTop:10,display:"flex",gap:8,justifyContent:"center"}}>
                <button onClick={captureWard} style={{padding:"10px 20px",borderRadius:8,background:"#3A3530",color:"#FAF6EE",border:"none",cursor:"pointer",fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase"}}>Capture</button>
                <button onClick={stopWardCam} style={{padding:"10px 16px",borderRadius:8,background:"transparent",color:"#8A8078",border:"1px solid rgba(80,70,60,.15)",cursor:"pointer",fontSize:11}}>Cancel</button>
              </div>
            </div>
          ) : (
            <div style={{textAlign:"center"}}>
              {wardPhoto ? (
                <div>
                  <div style={{position:"relative",display:"inline-block",marginBottom:12}}>
                    <img src={wardPhoto} alt="" style={{width:140,height:140,objectFit:"cover",borderRadius:12,border:"2px solid rgba(80,70,60,.1)"}}/>
                    <button onClick={function(){setWardPhoto(null);setWardRes(null);}} style={{position:"absolute",top:-6,right:-6,width:20,height:20,borderRadius:"50%",background:"#3A3530",color:"#FAF6EE",border:"none",cursor:"pointer",fontSize:11,lineHeight:"20px"}}>x</button>
                  </div>
                  {!wardRes && <Btn primary onClick={function(){checkWardMatch(wardPhoto,p);}}>{wardLoad?"Checking…":"Check This Colour"}</Btn>}
                </div>
              ) : (
                <div>
                  <p style={{fontSize:10,color:"#8A8078",margin:"0 0 12px",lineHeight:"1.5"}}>Aim at the main colour of the garment in natural light.</p>
                  <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                    <button onClick={startWardCam} style={{padding:"10px 16px",borderRadius:8,background:"#3A3530",color:"#FAF6EE",border:"none",cursor:"pointer",fontSize:11,fontWeight:600,letterSpacing:1}}>Take Photo</button>
                    <label style={{padding:"10px 16px",borderRadius:8,background:"transparent",color:"#6B6560",border:"1px solid rgba(80,70,60,.15)",cursor:"pointer",fontSize:11,fontWeight:600,letterSpacing:1}}>
                      Upload
                      <input type="file" accept="image/*" style={{display:"none"}} onChange={function(e){var fi=e.target.files&&e.target.files[0];if(fi){var rd=new FileReader();rd.onload=function(ev){setWardPhoto(ev.target.result);setWardRes(null);};rd.readAsDataURL(fi);}}}/>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Result */}
        {wardRes && (
          <Card mb={10}>
            <Lbl>Result</Lbl>
            <p style={{fontSize:13,color:"#3A3530",lineHeight:1.65,margin:"0 0 12px"}}>{wardRes}</p>
            <Btn onClick={function(){setWardPhoto(null);setWardRes(null);}}>Check Another Item</Btn>
          </Card>
        )}

        <Btn onClick={function(){go("result");}}>← Back to My Palette</Btn>
      </div>
    )}

    </div></div>
  );
}
