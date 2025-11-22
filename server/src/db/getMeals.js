
export const getMeals = async ({product, calories}, res)=>{

    console.log(product, calories)

    if(!calories || !product) return res.status(400).json({error: "Proszę wypełnić wszystkie pola"});

    const food = await fetchFood(product, res);
    const filtered = food.products.filter(k=>k.nutriments['energy-kcal_value'] !== undefined && k.nutriments['energy-kcal_value'] <= calories);


    for(const p of filtered){
        p.imageUrl = getImageUrl(p) || 'https://placehold.co/200x200/transparent/00aa58?text=Brak+Zdjęcia';
    };

    return res.status(200).json(filtered);
}

const fetchFood = async (product, res)=>{
    try{
        const req = await fetch(`https://world.openfoodfacts.net/cgi/search.pl?search_terms=${encodeURIComponent(product)}&fields=product_name,nutriments,generic_name,ingredients_text,images,code&page_size=5&json=true`, {
            method: "GET",
            headers: {
                'User-Agent': 'StudentPlanner/1.0 (miloszmarchewka.2020@gmail.com)'
            }

        });

        if(!req.ok){
            console.log(await req.text());
            return res.status(500).json({error: "Błąd serwera."});
        }

        const result = await req.json();
        return result;
    } catch(e){
        return res.status(500).json({error: e.message});
    }
}

const translate = async (text)=>{
    console.log("hi?");
    try{
        const req = await fetch("https://translate.argosopentech.com/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                q: text,
                source: "auto",
                target: "pl",
                format: "text"
            })
        });

        console.log(req.status);

        if(!req.ok) console.log("what");

        const res = await req.text();

        console.log(res.translatedText);
    } catch (e){
        console.log("what...", e.message);
    }
}

const getImageUrl = (product, imgField = "front_en", size = "400")=>{
  const img = product.images?.[imgField];
  if (!img) return null;

  const barcode = product.code;
  const first9 = barcode.slice(0, 9).padStart(9, "0");
  const imgid = img.imgid;
  const revision = img.rev || 1;

  return `https://images.openfoodfacts.org/images/products/${first9}/${barcode}/${imgid}.${revision}.${size}.jpg`;
}