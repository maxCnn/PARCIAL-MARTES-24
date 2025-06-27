export default function logger(req, res, next) {
    const inicio = Date.now();
    res.on("finish", () => {
        const tiempo = Date.now() - inicio;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${tiempo}ms)`);
    });
    next();
}