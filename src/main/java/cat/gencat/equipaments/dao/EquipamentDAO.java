package cat.gencat.equipaments.dao;

import java.util.List;

import cat.gencat.equipaments.model.Equipament;
import cat.gencat.ctti.canigo.arch.persistence.jpa.dao.GenericDAO;

public interface EquipamentDAO extends GenericDAO<Equipament, Long> {

	public List<Equipament> findPaginated(Integer page, Integer rpp,
			String sortField, String sortDirection, String filter);

	public Long count(String filter);

}