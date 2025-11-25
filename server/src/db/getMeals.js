
export const getMeals = async ({product, calories}, res)=>{
    try{
        const food = await fetchFood(product);
        let filtered = [];
        if(food && food?.products) {
            const cleaned = food?.products?.filter(k=>k.nutriments?.['energy-kcal_value'] !== null);
            filtered = calories ? cleaned.filter(k=>k.nutriments['energy-kcal_value'] !== undefined && k.nutriments['energy-kcal_value'] <= calories) : cleaned;
        }

        filtered = filtered || [];

        for(const p of filtered){
            p.imageUrl = getImageUrl(p) || 'https://placehold.co/200x200/transparent/00aa58?text=Brak+Zdjęcia';
        };

        return res.status(200).json(filtered || {});
    } catch(e){
        return res.status(500).json({error: "Błąd serwera."});
    }
}

const fetchFood = async (product)=>{
        let query;
        if((product == undefined || product==="undefined") || product?.trim() === ""){
            query = `search_terms=''&fields=product_name,nutriments,generic_name,ingredients_text,images,code&page_size=5&json=true`;
        } else {
            query = `search_terms=${product?.trim()}&fields=product_name,nutriments,generic_name,ingredients_text,images,code&page_size=5&json=true`;
        }

        const req = await fetch(`https://world.openfoodfacts.net/cgi/search.pl?${query}`, {
            method: "GET",
            headers: {
                'User-Agent': 'StudentPlanner/1.0 (miloszmarchewka.2020@gmail.com)'
            }

        });

        if(!req.ok){
            throw new Error(await req.text());
        }
        const result = await req.json();
        return result;
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