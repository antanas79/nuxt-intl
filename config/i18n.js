import { numberFormats } from '../formats/numberFormats'
import en from '../lang/en.js'
import fr from '../lang/fr.js'
import es from '../lang/es.js'
import it from '../lang/it.js'
import de from '../lang/de.js'
export default {
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, fr, de, es, it },
  numberFormats,
}
