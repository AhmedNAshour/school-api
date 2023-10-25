module.exports = ({ meta, config, managers }) => {
  return ({ req, res, next }) => {
    if (!req.headers.token) {
      console.log('token required but not found');
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 401,
        errors: 'unauthorized',
      });
    }
    let decoded = null;
    try {
      decoded = managers.token.verifyLongToken({ token: req.headers.token });
      if (!decoded) {
        console.log('failed to decode-1');
        return managers.responseDispatcher.dispatch(res, {
          ok: false,
          code: 401,
          errors: 'unauthorized',
        });
      }
    } catch (err) {
      console.log('failed to decode-2');
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 401,
        errors: 'unauthorized',
      });
    }

    const userRole = decoded.role;
    if (userRole === 'superAdmin' || userRole === 'schooladmin') {
      // Superadmins always have access, and schooladmins have access when 'role' matches
      if (userRole === 'schooladmin') {
        if (!decoded.schoolId) {
          return managers.responseDispatcher.dispatch(res, {
            ok: false,
            code: 403,
            errors: "You don't have access to any school",
          });
        }
        if (
          decoded.schoolId !== req.body.schoolId &&
          decoded.schoolId !== req.query.schoolId
        ) {
          return managers.responseDispatcher.dispatch(res, {
            ok: false,
            code: 403,
            errors: "You don't have access to this school",
          });
        }
      }
      next(decoded);
    } else {
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 403,
        errors: 'unauthorized',
      });
    }
  };
};
