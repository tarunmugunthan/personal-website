import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

const settings = await reader.singletons.settings.read();
if (!settings) throw new Error('Site settings missing. Create them in /keystatic.');

export default settings;
