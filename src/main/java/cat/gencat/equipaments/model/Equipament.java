package cat.gencat.equipaments.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "equipaments")
public class Equipament {

	private Long id;
	
	private String nom;
	
	private String adreca;
	
	private String municipi;
	
	private String codiPostal;

	private String comarca;
	
	private String telefon;
	
	private Float longitud;
	
	private Float latitud;
	
	private String categories;
	
	private String location;
	
	public Equipament() {
		
	}
	
	public Equipament(Long id) {
		this.id =id;
	}
	
	@Id
	@GeneratedValue
	@Column(name = "id", nullable = false, unique = true)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	//unique=false per proves de càrrega
	//@Column(name = "nom", nullable = false, unique = true)
	@Column(name = "nom", nullable = false, unique = false)
	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	@Column(name = "adreca")
	public String getAdreca() {
		return adreca;
	}

	public void setAdreca(String adreca) {
		this.adreca = adreca;
	}
	
	@Column(name = "municipi")
	public String getMunicipi() {
		return municipi;
	}

	public void setMunicipi(String municipi) {
		this.municipi = municipi;
	}	
	
	@Column(name = "cp")
	public String getCodiPostal() {
		return codiPostal;
	}

	public void setCodiPostal(String codiPostal) {
		this.codiPostal = codiPostal;
	}		
	
	@Column(name = "comarca")
	public String getComarca() {
		return comarca;
	}

	public void setComarca(String comarca) {
		this.comarca = comarca;
	}	
	
	@Column(name = "telefon")
	public String getTelefon() {
		return telefon;
	}

	public void setTelefon(String telefon) {
		this.telefon = telefon;
	}	
		
	@Column(name = "longitud")
	public Float getLongitud() {
		return longitud;
	}

	public void setLongitud(Float longitud) {
		this.longitud = longitud;
	}	
	
	@Column(name = "latitud")
	public Float getLatitud() {
		return latitud;
	}

	public void setLatitud(Float latitud) {
		this.latitud = latitud;
	}		
	
	@Column(name = "categories")
	public String getCategories() {
		return categories;
	}

	public void setCategories(String categories) {
		this.categories = categories;
	}		
	
	@Column(name = "Location")
	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}		
	
	@Override
	public String toString() {
		return "Equipament [nom=" + nom + "]";
	}
	
}
