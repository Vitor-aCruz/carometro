package com.example.carometro.config;

import org.hibernate.dialect.Dialect;
import org.hibernate.dialect.identity.IdentityColumnSupport;
import org.hibernate.dialect.identity.IdentityColumnSupportImpl;

public class SQLiteDialect extends Dialect {

    public SQLiteDialect() {
        super();
        // registrar tipos de dados e funções necessárias
    }

    @Override
    public IdentityColumnSupport getIdentityColumnSupport() {
        return new IdentityColumnSupportImpl();
    }

    @Override
    public boolean dropConstraints() {
        return false; // evita erros de foreign key ao usar "ddl-auto=update"
    }

    // outros métodos que você precisar sobrescrever para compatibilidade SQLite
}
