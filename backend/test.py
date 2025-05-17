from sqlalchemy import create_engine

# Sustituye esto con tu URI real de Railway
DATABASE_URL = "postgresql://postgres:UIkCCJaZaFCbOhnRxPoNKAeseJYfemJS@mainline.proxy.rlwy.net:58334/railway"

try:
    engine = create_engine(DATABASE_URL)
    connection = engine.connect()
    print("✅ Conexión exitosa a la base de datos.")
    connection.close()
except Exception as e:
    print("❌ Error al conectar a la base de datos:")
    print(e)