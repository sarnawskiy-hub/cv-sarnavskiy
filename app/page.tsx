import { promises as fs } from 'fs';
import path from 'path';
import CVRenderer from '@/components/CVRenderer';

export default async function Home() {
    // Read the CV markdown file from the project root
    const cvPath = path.join(process.cwd(), 'cv.md');
    const cvContent = await fs.readFile(cvPath, 'utf8');

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <CVRenderer markdown={cvContent} />
        </main>
    );
}
