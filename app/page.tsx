import { promises as fs } from 'fs';
import path from 'path';
import CVRenderer from '@/components/CVRenderer';

export default async function Home() {
    const cvPath = path.join(process.cwd(), 'cv.md');
    const cvContent = await fs.readFile(cvPath, 'utf8');

    return (
        <main className="min-h-screen relative">
            <CVRenderer markdown={cvContent} />
        </main>
    );
}
