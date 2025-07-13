// pages/api/paraphrase.js (untuk pages router)
// atau
// app/api/paraphrase/route.js (untuk app router)

export const POST = async (req) => {
  try {
    const { text } = await req.json();
    
    // Implementasi paraphraser (contoh sederhana)
    const paraphrased = text.split(' ').reverse().join(' '); // Contoh dummy
    
    return new Response(JSON.stringify({ 
      result: paraphrased 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: "Internal Server Error"
    }), {
      status: 500
    });
  }
}