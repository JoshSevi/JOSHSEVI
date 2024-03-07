import { mainscreen } from './main';
import { loco } from './loco';
export function splashscreen() {
    // Your splashscreen function implementation
    window.addEventListener('load', () => {
        // Assuming the splash screen is shown for 2 seconds
        setTimeout(() => {
            document.getElementById('splashscreen').style.display = 'none';
            document.getElementById('main-screen').classList.remove('hidden');
            mainscreen();
            loco();
        }, 2000);
    });
}
