import LocationTranslationModel from "./models/LocationTranslationModel";

async function run(){
  const rows = await LocationTranslationModel.findAll({ where: { locale: 'de' } });
  console.log(JSON.stringify(rows.map(r => r.toJSON()), null, 2));
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
