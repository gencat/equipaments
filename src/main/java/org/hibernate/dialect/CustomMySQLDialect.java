package org.hibernate.dialect;



public class CustomMySQLDialect extends org.hibernate.dialect.MySQLMyISAMDialect {
	public CustomMySQLDialect() {
		super();
		registerFunction("match_against", new MatchAgainstFunction() );	}
}