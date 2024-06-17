import { ref, type Ref, isRef } from 'vue';

import type { FormErrorType, FormValidationRule } from '~/utils/models';

const useFormErrorHandling = (
  rules: FormValidationRule[] | Ref<FormValidationRule[]>,
) => {
  const errors = ref<Record<string, string[]>>({});

  const validate = () => {
    const validRules = isRef(rules) ? rules.value : rules;

    errors.value = validRules.reduce((errors: FormErrorType, rule) => {
      if (!rule.isValid()) {
        errors[rule.key] = errors[rule.key]?.length
          ? [...errors[rule.key], rule.message]
          : [rule.message];
      }
      return errors;
    }, {});
  };

  return {
    errors,
    validate,
  };
};

export default useFormErrorHandling;
