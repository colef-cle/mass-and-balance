package fr.colef.massandbalance;

import java.io.IOException;

import javax.servlet.Filter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.deser.std.StringDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;

import fr.colef.massandbalance.config.HttpsEnforcer;

@SpringBootApplication
public class MassAndBalanceApplication {

	public static void main( String[] args ) {
		SpringApplication.run( MassAndBalanceApplication.class, args );
	}

	// HTTPS ENFORCER
	@Bean
	public Filter httpsEnforcerFilter() {
		return new HttpsEnforcer();
	}

	// NULLABLE HIBERNATE PROXYS
	@Bean
	public Hibernate5Module dataTypeHibernateModule() {
		return new Hibernate5Module();
	}

	// JSON EMPTY STRING AS NULL
	@Bean
	public SimpleModule emptyStringAsNullModule() {
		SimpleModule module = new SimpleModule();

		module.addDeserializer(
		        String.class,
		        new StdDeserializer<String>( String.class ) {
			        private static final long serialVersionUID = 1L;

			        @Override
			        public String deserialize( JsonParser parser, DeserializationContext context )
			                throws IOException {
				        String result = StringDeserializer.instance.deserialize( parser, context );
				        if ( result.isEmpty() ) {
					        return null;
				        }
				        return result;
			        }
		        } );

		return module;
	}

}
