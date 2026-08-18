// Type for User table
export interface UserInterface {
	id: number; // primary key
	name: string;
	surname: string;
	address: string;
	birthDate?: Date;
	locale: 'en-US' | 'ja-JP' | 'zh-CN' | 'fr-FR' | 'de-DE' | 'es-ES' | 'it-IT' | 'pt-PT' | 'ru-RU';
}
