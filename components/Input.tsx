import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

interface InputFieldProps<T extends FieldValues> {
  formControl: Control<T>;
  isPending: boolean;
  placeholder: string;
  label: string;
  type: string;
  name: Path<T>; 
}

const InputField = <T extends FieldValues>({
  formControl,
  isPending,
  label,
  type,
  name,
}: InputFieldProps<T>) => {
  return (
    <div className='group relative'>
      <FormField
        control={formControl}
        name={name} // `name` is now correctly typed as `Path<T>`
        render={({ field }) => (
          <FormItem>
            <FormLabel className={`text-gray-200 font-normal group absolute ${field.value ? '-top-2' : 'top-3'} left-3 group-focus-within:-top-2 transition-all bg-cyan-900 duration-300`}>
              {label}
            </FormLabel>
            <FormControl>
              <Input
                disabled={isPending}
                {...field}
                type={type}
                className='text-white placeholder:text-gray-300/60 group-:text-red-400 py-5 cursor-pointer'
                autoFocus
              />
            </FormControl>
            <FormMessage className='text-red-200' />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InputField;
