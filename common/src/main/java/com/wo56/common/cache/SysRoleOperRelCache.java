package com.wo56.common.cache;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.framework.core.SysContexts;
import com.framework.core.cache.AbstractCache;
import com.framework.core.cache.CacheFactory;
import com.wo56.business.sys.vo.SysRoleOperRel;
import com.wo56.common.consts.PermissionConsts;

/**
 * 系统角色缓存
 * @author chenjun
 *
 */
public class SysRoleOperRelCache extends AbstractCache {
	@Override
	public void loadDate() throws Exception {
		Session session = SysContexts.getEntityManager(true);
		Criteria ca = session.createCriteria(SysRoleOperRel.class);
		ca.add(Restrictions.eq(PermissionConsts.GrantConstant.STATE, PermissionConsts.GrantConstant.STATE_1));
		List<SysRoleOperRel> list = ca.list();
		CacheFactory.put(SysRoleOperRelCache.class.getName(),PermissionConsts.GrantConstant.SYS_ROLE_OPER_REL_CACHE_KEY, list);
	}
}
