

function ContactoPage() {
    return (
        <div className="flex flex-col items-center py-8 px-4 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-semibold mb-6">Contacto</h1>

            <div className="text-center mb-8">
                <p className="text-lg mb-2">Dirección: Avenue Gral Galindo, Cochabamba</p>
                <p className="text-lg mb-2">Teléfono: +591 4 123 4567</p>
                <p className="text-lg">Correo electrónico: contacto@ajaxsoft.com</p>
            </div>

            <div className="w-full max-w-lg h-96">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1070.8583813957375!2d-66.14345600196822!3d-17.375562168199764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3741d748dc963%3A0x827a345485a10d45!2sAvenue%20Gral%20Galindo%2C%20Cochabamba!5e1!3m2!1ses!2sbo!4v1730167077167!5m2!1ses!2sbo"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación en Google Maps"
                />
            </div>
        </div>
    );
}

export default ContactoPage;
